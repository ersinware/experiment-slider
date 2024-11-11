<script>
	import SliderItem from "$lib/components/slider/SliderItem.svelte";
	import {
		EVENT_SLIDER_LOADED,
		EVENT_SLIDER_LOADED_AGAIN,
		EVENT_SLIDE_ENDED,
		EVENT_SLIDE_ENDING,
		EVENT_SLIDE_STARTED,
		EVENT_SLIDE_STARTING,
	} from "$lib/js/client/constants.slider.client";
	import { onMount } from "svelte";

	export let sliderId,
		scrollMode,
		sliderIndexAtFirst = 0,
		maxColumnOrRowCount,
		totalElementCountAtFirst,
		selfIndex,
		dontPreload,
		image;

	const eventPostfix = "_" + sliderId;

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
	}

	function onSliderLoadedAgain(event) {}

	function onSlideStarting(event) {}

	function onSlideStarted(event) {}

	function onSlideEnding(event) {}

	function onSlideEnded(event) {}

	function removeListeners() {
		window.removeEventListener(EVENT_SLIDER_LOADED + eventPostfix, onSliderLoaded);
		window.removeEventListener(EVENT_SLIDER_LOADED_AGAIN + eventPostfix, onSliderLoadedAgain);

		window.removeEventListener(EVENT_SLIDE_STARTING + eventPostfix, onSlideStarting);
		window.removeEventListener(EVENT_SLIDE_STARTED + eventPostfix, onSlideStarted);
		window.removeEventListener(EVENT_SLIDE_ENDING + eventPostfix, onSlideEnding);
		window.removeEventListener(EVENT_SLIDE_ENDED + eventPostfix, onSlideEnded);
	}
</script>

<SliderItem
	{sliderId}
	classes="b-box big-screen-flex big-screen-a-i-c big-screen-h-100vh p-top-for-header small-screen-max-h-40rem small-screen-p-h-d"
	{scrollMode}
	{sliderIndexAtFirst}
	{maxColumnOrRowCount}
	{totalElementCountAtFirst}
	{selfIndex}
	{dontPreload}
>
	<img class="coffee-image big-screen-h-100vh small-screen-w-100" src={image.src} alt={image.alt} />
</SliderItem>

