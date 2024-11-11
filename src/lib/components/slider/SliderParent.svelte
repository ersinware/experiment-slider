<script>
	import {
		EVENT_SLIDER_LOADED,
		EVENT_SLIDER_LOADED_AGAIN,
		EVENT_SLIDE_TO_NEXT,
		EVENT_SLIDE_TO_PREVIOUS,
		ORIENTATITON_SLIDER_HORIZONTAL,
	} from "$lib/js/client/constants.slider.client";
	import {
		onMountHoverable,
		onMountHoverableReverse,
		onMountTouchable,
		onMountTouchableReverse,
		removeAllPointerRelated,
	} from "$lib/js/client/util.responsive.client";
	import { onMount } from "svelte";

	export let ids, priority;

	const eventPostfix = "_" + ids[0];

	let orientation, wrapper, sliderContent, startTime, startX, lastX, startY, lastY;

	onMount(_onMount);

	async function _onMount() {
		window.addEventListener(EVENT_SLIDER_LOADED + eventPostfix, onSliderLoaded);

		return () => {
			window.removeEventListener(EVENT_SLIDER_LOADED + eventPostfix, onSliderLoaded);
			window.removeEventListener(EVENT_SLIDER_LOADED_AGAIN + eventPostfix, onSliderLoadedAgain);
			removeAllPointerRelated(ids[0]);

			if (!sliderContent) return;

			sliderContent.removeEventListener("whell", onWhell);
			clearTouchableListeners();
		};
	}

	function onSliderLoaded(event) {
		orientation = event.detail.orientation;
		window.addEventListener(EVENT_SLIDER_LOADED_AGAIN + eventPostfix, onSliderLoadedAgain);

		load();
	}

	function onSliderLoadedAgain(event) {
		orientation = event.detail.orientation;
	}

	function load() {
		sliderContent = wrapper.querySelector(".slider-content");

		onMountHoverable({
			id: ids[0],
			onMount: () => {
				sliderContent.addEventListener("wheel", onWhell);
			},
		});

		onMountHoverableReverse({
			id: ids[0],
			reverse: () => {
				sliderContent.removeEventListener("wheel", onWhell);
			},
		});

		onMountTouchable({
			id: ids[0],
			onMount: () => {
				sliderContent.addEventListener("touchstart", onTouchStart);
				sliderContent.addEventListener("touchmove", onTouchMove);
				sliderContent.addEventListener("touchcancel", onTouchCancel);
				sliderContent.addEventListener("touchend", onTouchEnd);
			},
		});

		onMountTouchableReverse({
			id: ids[0],
			reverse: () => {
				clearTouchableListeners();
			},
		});
	}

	function onWhell(event) {
		if (event.priority && event.priority > priority) return;

		event.priority = priority;

		if (event.deltaY > 0 || (orientation === ORIENTATITON_SLIDER_HORIZONTAL && event.deltaX > 0)) toNext(event);
		else if (event.deltaY < 0 || (orientation === ORIENTATITON_SLIDER_HORIZONTAL && event.deltaX < 0))
			toPrevious(event);
	}

	function onTouchStart(event) {
		startTime = Date.now();
		startX = event.touches[0].clientX;
		startY = event.touches[0].clientY;
	}

	function onTouchMove(event) {
		lastX = event.touches[0].clientX;
		lastY = event.touches[0].clientY;
	}

	function onTouchCancel(event) {
		onTouchEnd(event);
	}

	function onTouchEnd(event) {
		if (event.priority && event.priority > priority) return;

		const distance =
			orientation === ORIENTATITON_SLIDER_HORIZONTAL ? Math.abs(startX - lastX) : Math.abs(startY - lastY);

		if (distance > 30 && Date.now() - startTime < 333) {
			event.priority = priority;

			const condition = orientation === ORIENTATITON_SLIDER_HORIZONTAL ? startX > lastX : startY > lastY;

			if (condition) toNext(event);
			else toPrevious(event);
		}

		clearTouchRelated();
	}

	/* */

	function toPrevious(event) {
		for (const id of ids) window.dispatchEvent(new CustomEvent(EVENT_SLIDE_TO_PREVIOUS + "_" + id, { detail: event }));
	}

	function toNext(event) {
		for (const id of ids) {
			EVENT_SLIDE_TO_NEXT + "_" + id;
			window.dispatchEvent(new CustomEvent(EVENT_SLIDE_TO_NEXT + "_" + id, { detail: event }));
		}
	}

	/* */

	function clearTouchRelated() {
		startTime = undefined;
		startY = undefined;
		lastY = undefined;
		startX = undefined;
		lastX = undefined;
	}

	function clearTouchableListeners() {
		sliderContent.removeEventListener("touchstart", onTouchStart);
		sliderContent.removeEventListener("touchmove", onTouchMove);
		sliderContent.removeEventListener("touchcancel", onTouchCancel);
		sliderContent.removeEventListener("touchend", onTouchEnd);
	}
</script>

<div class="slider-parent d-contents" bind:this={wrapper}>
	<slot />
</div>
