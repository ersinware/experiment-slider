<script>
	import {
		EVENT_SLIDER_ITEM_LOADED,
		EVENT_SLIDER_LOADED,
		EVENT_SLIDER_LOADED_AGAIN,
		EVENT_SLIDE_ENDED,
		EVENT_SLIDE_ENDING,
		EVENT_SLIDE_STARTED,
		EVENT_SLIDE_STARTING,
		MODE_SCROLL_SLIDER_ALL,
	} from "$lib/js/client/constants.slider.client";
	import {
		getPageNumberOfSliderItem,
		isBetweenNumbers,
		isBetweenNumbersInclusive,
		isDifferenceOne,
	} from "$lib/js/client/util.slider.client";
	import { onMount } from "svelte";

	export let sliderId,
		style,
		classes,
		scrollMode,
		// used to determine should be preloaded
		sliderIndexAtFirst = 0,
		// used to determine should be preloaded
		maxColumnOrRowCount,
		// required when scrollMode = MODE_SCROLL_SLIDER_ALL, used to determine items at the page pageCount - 2 should be preloaded when totalElementCount % maxColumnOrRowCount !== 0
		totalElementCountAtFirst,
		selfIndex,
		dontPreload;

	let pageSelf = getPageNumberOfSliderItem(selfIndex, maxColumnOrRowCount);

	const eventPostfix = "_" + sliderId,
		eventPostfixSelf = eventPostfix + "_" + selfIndex,
		preload = !dontPreload && mayBeVisibleAtFirst();

	let loaded = preload;

	if (preload) console.log(sliderId + ":preloaded:", selfIndex);

	onMount(_onMount);

	function _onMount() {
		window.addEventListener(EVENT_SLIDER_LOADED + eventPostfix, onSliderLoaded);

		return removeListeners;
	}

	function onSliderLoaded(event) {
		window.addEventListener(EVENT_SLIDER_LOADED_AGAIN + eventPostfix, onSliderLoadedAgain);

		window.addEventListener(EVENT_SLIDE_STARTING + eventPostfix, onSlideStarting);
		window.addEventListener(EVENT_SLIDE_STARTED + eventPostfix, onSlideStarted);
		window.addEventListener(EVENT_SLIDE_ENDING + eventPostfix, onSlideEnding);
		window.addEventListener(EVENT_SLIDE_ENDED + eventPostfix, onSlideEnded);

		const { columnOrRowCount, page, index } = event.detail;
		adjustSelf(columnOrRowCount, page, index);
	}

	function onSliderLoadedAgain(event) {
		const { columnOrRowCount, page, index } = event.detail;
		adjustSelf(columnOrRowCount, page, index);
	}

	function onSlideStarting(event) {
		const { elementCount, columnOrRowCount, pageCount, fromPage, toPage, from, to } = event.detail;

		if (scrollMode === MODE_SCROLL_SLIDER_ALL)
			onSlideStartingAllMode(elementCount, columnOrRowCount, pageCount, fromPage, toPage);
		else onSlideStartingItemMode(columnOrRowCount, from, to);
	}

	function onSlideStarted() {}

	function onSlideEnding() {}

	function onSlideEnded(event) {
		const { columnOrRowCount, toPage, to } = event.detail;
		adjustSelf(columnOrRowCount, toPage, to);
	}

	/* */

	function mayBeVisibleAtFirst() {
		if (!maxColumnOrRowCount || sliderIndexAtFirst === undefined || totalElementCountAtFirst === undefined)
			return false;

		if (scrollMode === MODE_SCROLL_SLIDER_ALL) {
			const pageCount = Math.ceil(totalElementCountAtFirst / maxColumnOrRowCount);

			if (pageSelf === sliderIndexAtFirst) return true;

			if (
				sliderIndexAtFirst === pageCount - 1 &&
				pageSelf === pageCount - 2 &&
				willItemBeVisibleAtLastPage(maxColumnOrRowCount, totalElementCountAtFirst)
			)
				return true;

			return;
		}

		if (selfIndex === sliderIndexAtFirst) return true;

		return selfIndex > sliderIndexAtFirst && selfIndex < sliderIndexAtFirst + maxColumnOrRowCount;
	}

	function adjustSelf(columnOrRowCount, page, index) {
		pageSelf = getPageNumberOfSliderItem(selfIndex, columnOrRowCount);

		if (shouldBeLoaded(columnOrRowCount, page, index)) if (!loaded) load();
	}

	function shouldBeLoaded(columnOrRowCount, page, index) {
		if (scrollMode === MODE_SCROLL_SLIDER_ALL) {
			if (pageSelf === page || isDifferenceOne(pageSelf, page)) return true;

			return;
		}

		return isBetweenNumbersInclusive(selfIndex, index - 1, index + columnOrRowCount);
	}

	function onSlideStartingAllMode(totalElementCount, columnOrRowCount, pageCount, fromPage, toPage) {
		if (pageSelf === fromPage) return;

		if (pageSelf === toPage) {
			if (!loaded) load();

			return;
		}

		if (
			toPage === pageCount - 1 &&
			pageSelf === pageCount - 2 &&
			willItemBeVisibleAtLastPage(columnOrRowCount, totalElementCount)
		) {
			if (!loaded) load();

			return;
		}
	}

	function onSlideStartingItemMode(columnOrRowCount, from, to) {
		if (from == selfIndex) return;

		if (to === selfIndex) {
			if (!loaded) load();

			return;
		}

		if (isBetweenNumbers(selfIndex, to, to + columnOrRowCount)) if (!loaded) load();
	}

	// required when scrollMode = MODE_SCROLL_SLIDER_ALL, used to determine whether items at the page pageCount - 2 should be loaded when totalElementCount % columnOrRowCount !== 0
	function willItemBeVisibleAtLastPage(columnOrRowCount, totalElementCount) {
		const mod = totalElementCount % columnOrRowCount;

		if (mod === 0) return;
		if (selfIndex <= mod - 1) return;

		return isBetweenNumbers(selfIndex, totalElementCount - columnOrRowCount - mod, totalElementCount - 1);
	}

	/* */

	async function load() {
		console.log(sliderId + ":sliderItemPage:load:" + selfIndex);

		loaded = true;

		// synchronization problem, removed = false does not add d-contents immediately
		queueMicrotask(() => window.dispatchEvent(new CustomEvent(EVENT_SLIDER_ITEM_LOADED + eventPostfixSelf)));
	}

	function removeListeners() {
		window.removeEventListener(EVENT_SLIDER_LOADED + eventPostfix, onSliderLoaded);
		window.removeEventListener(EVENT_SLIDER_LOADED_AGAIN + eventPostfix, onSliderLoadedAgain);

		window.removeEventListener(EVENT_SLIDE_STARTING + eventPostfix, onSlideStarting);
		window.removeEventListener(EVENT_SLIDE_STARTED + eventPostfix, onSlideStarted);
		window.removeEventListener(EVENT_SLIDE_ENDING + eventPostfix, onSlideEnding);
		window.removeEventListener(EVENT_SLIDE_ENDED + eventPostfix, onSlideEnded);
	}
</script>

<div style={style ?? ""} class="slider-item {classes ?? ''}">
	<slot />
</div>

<style>
	.slider-item {
		flex: 0 0 max(var(--grid-item-max-width), var(--grid-item-min-width)) !important;
	}
</style>
