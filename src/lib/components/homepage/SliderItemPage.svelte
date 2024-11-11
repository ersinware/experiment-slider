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
	import { L } from "$lib/js/client/localization/localization.translations.data.client.app";
	import { getStore } from "$lib/js/client/util.client";
	import { onMount } from "svelte";

	export let sliderId,
		classes,
		scrollMode,
		sliderIndexAtFirst = 0,
		maxColumnOrRowCount,
		totalElementCountAtFirst,
		selfIndex,
		fullWidth = false,
        noPaddingTopForHeader = false;

	const eventPostfix = "_" + sliderId,
		lang = getStore("lang");

	let going, coming, came, gone;

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

	function onSlideStarting(event) {
		const { from, to } = event.detail;

		came = false;
		if (selfIndex === to) coming = true;
		else if (selfIndex === from) going = true;
		else gone = true;
	}

	function onSlideStarted() {}

	function onSlideEnding(event) {
		const { to } = event.detail;

		coming = false;
		going = false;
		if (selfIndex === to) {
			gone = false;
			came = true;
		} else {
			came = false;
			gone = true;
		}
	}

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
	{classes}
	{scrollMode}
	{sliderIndexAtFirst}
	{maxColumnOrRowCount}
	{totalElementCountAtFirst}
	{selfIndex}
>
	<article
		class="b-box slider-item-page-content flex a-i-c j-c-c h-100vh"
		class:max-w={!fullWidth}
		class:m-h-auto={!fullWidth}
        class:p-top-for-header={!noPaddingTopForHeader}
		class:coming
		class:going
		class:came
		class:gone
	>
		<slot>
			<h1 class="section-title">{L("page", $lang)} {selfIndex}</h1>
		</slot>
	</article>
</SliderItem>

<style>
	.slider-item-page-content {
		opacity: 1;

		transform: scale(1);

		transition: opacity, transform;
		transition-duration: 0.375s;
		transition-timing-function: ease-in-out;
	}

	.coming {
		opacity: 0.5;
		transform: scale(0.8);
	}

	.going {
		opacity: 0.5;
		transform: scale(0.8);
	}

	.came {
		opacity: 1;
	}

	.gone {
		opacity: 0.5;
		transform: scale(0.8);
	}
</style>
