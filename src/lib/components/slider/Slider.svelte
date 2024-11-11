<script>
	import {
		EVENT_SLIDER_LOAD,
		EVENT_SLIDER_LOADED,
		EVENT_SLIDER_LOADED_AGAIN,
		EVENT_SLIDER_LOAD_AGAIN,
		EVENT_SLIDE_ENDED,
		EVENT_SLIDE_ENDING,
		EVENT_SLIDE_STARTED,
		EVENT_SLIDE_STARTING,
		EVENT_SLIDE_TO_INDEX,
		EVENT_SLIDE_TO_NEXT,
		EVENT_SLIDE_TO_PREVIOUS,
		MODE_SCROLL_SLIDER_ALL,
		MODE_SCROLL_SLIDER_ITEM,
		MODE_SLIDER_LOAD_AUTO,
		ORIENTATITON_SLIDER_HORIZONTAL,
	} from "$lib/js/client/constants.slider.client";
	import {
		clearSliding,
		getSliding,
		isSlidingSibling,
		setSliding,
		waitFor,
		yieldToMain,
	} from "$lib/js/client/util.client";
	import { getPageCount, getPageNumberOfSliderItem } from "$lib/js/client/util.slider.client";
	import { onMount } from "svelte";
	import { cubicInOut } from "svelte/easing";
	import { tweened } from "svelte/motion";
	import SliderParent from "./SliderParent.svelte";

	export let id,
		siblingId,
		priority = 1,
		loadMode = MODE_SLIDER_LOAD_AUTO,
		orientation = ORIENTATITON_SLIDER_HORIZONTAL,
		scrollMode = MODE_SCROLL_SLIDER_ALL,
		scrollDuration = 1000,
		waitDuration = 0,
		index = 0,
		reverse = false,
		manualParent = false;

	const eventPostfix = "_" + id;

	let wrapper,
		sliderContent,
		sliderItem,
		elementCount,
		columnOrRowCount,
		pageCount,
		currentScroll,
		unsubscribeScroll,
		page,
		lastIndex,
		lastPage,
		loaded,
		sliding;

	onMount(_onMount);

	async function _onMount() {
		if (loadMode === MODE_SLIDER_LOAD_AUTO) load();
		else window.addEventListener(EVENT_SLIDER_LOAD + eventPostfix, load);

		return removeListeners;
	}

	async function load(event) {
		sliderContent = wrapper.querySelector(".slider-content");
		sliderItem = sliderContent.querySelector(".slider-item");

		const newOrientation = event?.detail?.orientation;
		if (newOrientation) orientation = newOrientation;

		calculate();

		currentScroll = tweened(
			orientation === ORIENTATITON_SLIDER_HORIZONTAL ? getTargetScrollLeft() : getTargetScrollTop(),
			{
				duration: scrollDuration,
				easing: cubicInOut,
			}
		);

		subscribeScroll();
		addListeners();

		await yieldToMain();

		loaded = true;

		window.dispatchEvent(
			new CustomEvent(EVENT_SLIDER_LOADED + eventPostfix, {
				detail: { elementCount, columnOrRowCount, pageCount, index, page, orientation },
			})
		);
	}

	function loadAgain(event) {
		if (!loaded) return;

		const newOrientation = event?.detail?.orientation;
		if (newOrientation) orientation = newOrientation;

		calculate();

		unsubscribeScroll();
		subscribeScroll();

		currentScroll.set(orientation === ORIENTATITON_SLIDER_HORIZONTAL ? getTargetScrollLeft() : getTargetScrollTop(), {
			duration: 0,
		});

		window.dispatchEvent(
			new CustomEvent(EVENT_SLIDER_LOADED_AGAIN + eventPostfix, {
				detail: { elementCount, columnOrRowCount, pageCount, index, page, orientation },
			})
		);
	}

	function calculate() {
		elementCount = sliderContent.querySelectorAll(":scope > .slider-item").length;

		if (orientation === ORIENTATITON_SLIDER_HORIZONTAL) {
			columnOrRowCount = Math.round(sliderContent.clientWidth / sliderItem.clientWidth);
			pageCount = getPageCount(scrollMode, elementCount, columnOrRowCount);

			adjustIndexAndPage();

			return;
		}

		columnOrRowCount = Math.round(sliderContent.clientHeight / sliderItem.clientHeight);
		pageCount = getPageCount(scrollMode, elementCount, columnOrRowCount);

		adjustIndexAndPage();
	}

	function adjustIndexAndPage() {
		if (index === undefined) index = 0;
		else if (index >= pageCount) index = pageCount - 1;

		lastIndex = index;
		page = lastPage =
			scrollMode === MODE_SCROLL_SLIDER_ALL ? index : getPageNumberOfSliderItem(index, columnOrRowCount);
	}

	function subscribeScroll() {
		if (orientation === ORIENTATITON_SLIDER_HORIZONTAL)
			unsubscribeScroll = currentScroll.subscribe((val) => (sliderContent.scrollLeft = val));
		else unsubscribeScroll = currentScroll.subscribe((val) => (sliderContent.scrollTop = val));
	}

	/* */

	async function onToPrevious(event) {
		if (maySlide()) return;

		if ((reverse && index === pageCount - 1) || (!reverse && index === 0)) {
			event.detail.priority = -1;

			return;
		}

		sliding = true;
		setSliding(id);

		if (reverse) increment();
		else decrement();

		startSliding();
	}

	async function onToNext(event) {
		if (maySlide()) return;

		if ((reverse && index === 0) || (!reverse && index === pageCount - 1)) {
			event.detail.priority = -1;

			return;
		}

		sliding = true;
		setSliding(id);

		if (reverse) decrement();
		else increment();

		startSliding();
	}

	async function onToIndex(event) {
		if (maySlide()) return;

		if (index === event.detail) return;

		sliding = true;
		setSliding(id);

		index = event.detail;
		page = scrollMode === MODE_SCROLL_SLIDER_ALL ? index : getPageNumberOfSliderItem(index, columnOrRowCount);

		startSliding();
	}

	function maySlide() {
		return sliding || (getSliding() && !isSlidingSibling(siblingId));
	}

	/* */

	async function startSliding() {
		await yieldToMain();
        
		window.dispatchEvent(
			new CustomEvent(EVENT_SLIDE_STARTING + eventPostfix, {
				detail: {
					elementCount,
					columnOrRowCount,
					pageCount,
					fromPage: lastPage,
					toPage: page,
					from: lastIndex,
					to: index,
				},
			})
		);

		await waitFor(waitDuration);

		window.dispatchEvent(
			new CustomEvent(EVENT_SLIDE_STARTED + eventPostfix, {
				detail: {
					elementCount,
					columnOrRowCount,
					pageCount,
					fromPage: lastPage,
					toPage: page,
					from: lastIndex,
					to: index,
				},
			})
		);

		await yieldToMain();
		await slide();
	}

	async function slide() {
		if (orientation === ORIENTATITON_SLIDER_HORIZONTAL) $currentScroll = getTargetScrollLeft();
		else $currentScroll = getTargetScrollTop();

		await waitFor(scrollDuration);
		window.dispatchEvent(
			new CustomEvent(EVENT_SLIDE_ENDING + eventPostfix, {
				detail: {
					elementCount,
					columnOrRowCount,
					pageCount,
					fromPage: lastPage,
					toPage: page,
					from: lastIndex,
					to: index,
				},
			})
		);

		await waitFor(waitDuration);
		window.dispatchEvent(
			new CustomEvent(EVENT_SLIDE_ENDED + eventPostfix, {
				detail: {
					elementCount,
					columnOrRowCount,
					pageCount,
					fromPage: lastPage,
					toPage: page,
					from: lastIndex,
					to: index,
				},
			})
		);

		lastIndex = index;
		lastPage = page;
		sliding = false;
		clearSliding();
	}

	function getTargetScrollLeft() {
		if (scrollMode === MODE_SCROLL_SLIDER_ITEM) return index * sliderItem.clientWidth;
		else {
			const clientWidth = sliderContent.clientWidth,
				target = index * clientWidth,
				scrollWidth = sliderContent.scrollWidth;

			if (target + clientWidth > scrollWidth) return scrollWidth - clientWidth;

			return target;
		}
	}

	function getTargetScrollTop() {
		if (scrollMode === MODE_SCROLL_SLIDER_ITEM) return index * sliderItem.clientHeight;
		else {
			const clientHeight = sliderContent.clientHeight,
				target = index * clientHeight,
				scrollHeight = sliderContent.scrollHeight;

			if (target + clientHeight > scrollHeight) return scrollHeight - clientHeight;

			return target;
		}
	}

	function decrement() {
		index--;
		page = scrollMode === MODE_SCROLL_SLIDER_ALL ? index : getPageNumberOfSliderItem(index, columnOrRowCount);
	}

	function increment() {
		index++;
		page = scrollMode === MODE_SCROLL_SLIDER_ALL ? index : getPageNumberOfSliderItem(index, columnOrRowCount);
	}

	function onResize() {
		loadAgain();
	}

	/* */

	function addListeners() {
		window.addEventListener(EVENT_SLIDER_LOAD_AGAIN + eventPostfix, loadAgain);

		window.addEventListener(EVENT_SLIDE_TO_PREVIOUS + eventPostfix, onToPrevious);
		window.addEventListener(EVENT_SLIDE_TO_NEXT + eventPostfix, onToNext);
		window.addEventListener(EVENT_SLIDE_TO_INDEX + eventPostfix, onToIndex);

		window.addEventListener("resize", onResize);
	}

	function removeListeners() {
		window.removeEventListener(EVENT_SLIDER_LOAD + eventPostfix, load);
		window.removeEventListener(EVENT_SLIDER_LOAD_AGAIN + eventPostfix, loadAgain);

		window.removeEventListener(EVENT_SLIDE_TO_PREVIOUS + eventPostfix, onToPrevious);
		window.removeEventListener(EVENT_SLIDE_TO_NEXT + eventPostfix, onToNext);
		window.removeEventListener(EVENT_SLIDE_TO_INDEX + eventPostfix, onToIndex);

		window.removeEventListener("resize", onResize);
	}
</script>

{#if manualParent}
	<div class="slider d-contents" bind:this={wrapper}>
		<slot />
	</div>
{:else}
	<SliderParent ids={[id]} {priority}>
		<div class="slider d-contents" bind:this={wrapper}>
			<slot />
		</div>
	</SliderParent>
{/if}
