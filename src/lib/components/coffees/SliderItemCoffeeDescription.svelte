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
		description;

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

	function onSlideStarted() {}

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
	classes="b-box small-screen-p-h-d"
	{scrollMode}
	{sliderIndexAtFirst}
	{maxColumnOrRowCount}
	{totalElementCountAtFirst}
	{selfIndex}
	{dontPreload}
>
	<slot>
		<article
			class="b-box flex f-column big-screen-j-c-c big-screen-g-2dot5 big-screen-h-100vh big-screen-p-top-for-header small-screen-a-i-c small-screen-g-2 small-screen-max-w-phone small-screen-m-h-auto small-screen-t-a-c"
		>
			<div>
				<div class="t-hint t-hint-coffee unimportant-text-color">{description.tHint}</div>
				<h1 class="section-title">{description.title}</h1>
			</div>

			<p class="section-text f-w-500">{description.description}</p>
		</article>
	</slot>
</SliderItem>

<style>
	.t-hint-coffee {
		line-height: 0.75rem;
		height: 0.75rem;

		font-family: Poppins, sans-serif;
		font-size: 0.75rem;

		margin-bottom: 0.75rem;
	}

	@media (min-width: 65.001em) {
		.t-hint-coffee {
			margin-left: 0.25rem;
		}
	}
</style>
