<script>
	import { page } from "$app/stores";
	import ColdCoffees from "$lib/components/coffees/cold-coffees/ColdCoffees.svelte";
	import HotCoffees from "$lib/components/coffees/hot-coffees/HotCoffees.svelte";
	import SliderItemPage from "$lib/components/homepage/SliderItemPage.svelte";
	import Slider from "$lib/components/slider/Slider.svelte";
	import {
		EVENT_SLIDE_STARTED,
		MODE_SCROLL_SLIDER_ITEM,
		MODE_SLIDER_LOAD_AUTO,
		ORIENTATITON_SLIDER_VERTICAL,
		SLIDER_ID_PAGES,
		SLIDER_PAGES_SCROLL_DURATION,
		SLIDER_PAGES_WAIT_DURATION,
	} from "$lib/js/client/constants.slider.client";
	import { L } from "$lib/js/client/localization/localization.translations.data.client.app";
	import { getStore, waitFor } from "$lib/js/client/util.client";
	import {
		getLocalizedSearchParam,
		getLocalizedSearchValue,
	} from "$lib/js/common/localization/localization.util.common";
	import { onMount } from "svelte";
	import Contact from "../contact/Contact.svelte";

	const sliderIndexAtFirst = $page.data.sliderIndexAtFirst,
		eventPostfix = "_" + SLIDER_ID_PAGES,
		lang = getStore("lang"),
		url = getStore("url");

	let title = getTargetWindowTitle(sliderIndexAtFirst);

	onMount(_onMount);

	function _onMount() {
		window.addEventListener(EVENT_SLIDE_STARTED + eventPostfix, onSlideStarted);

		return () => {
			window.removeEventListener(EVENT_SLIDE_STARTED + eventPostfix, onSlideStarted);
		};
	}

	async function onSlideStarted(event) {
		await waitFor(SLIDER_PAGES_SCROLL_DURATION / 2);

		const to = event.detail.to;
		setSearchParam(getSearchParamByIndex(to));
		setWindowTitle(to);
	}

	async function setSearchParam(value) {
		const _url = new URL($url);

		if (value) _url.search = "?" + getLocalizedSearchParam("page", $lang) + "=" + value;
		else _url.search = "";

		const newOne = decodeURI(_url.toString());
		$url = newOne;

		window.history.replaceState(window.history.state, window.document.title, newOne);
	}

	function getSearchParamByIndex(index) {
		switch (index) {
			case 0:
				return "";
			case 1:
				return getLocalizedSearchValue("hot-coffees", $lang);
			case 2:
				return getLocalizedSearchValue("cold-coffees", $lang);
			case 3:
				return getLocalizedSearchValue("gallery", $lang);
			case 4:
				return getLocalizedSearchValue("about-us", $lang);
			case 5:
				return getLocalizedSearchValue("contact", $lang);
		}
	}

	function setWindowTitle(index) {
		title = getTargetWindowTitle(index);
	}

	function getTargetWindowTitle(index) {
		switch (index) {
			case 0:
				return L("homepage-title", $lang);
			case 1:
				return L("hot-coffees-title", $lang);
			case 2:
				return L("cold-coffees-title", $lang);
			case 3:
				return L("gallery-title", $lang);
			case 4:
				return L("about-us-title", $lang);
			case 5:
				return L("contact-title", $lang);
		}
	}
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<Slider
	id={SLIDER_ID_PAGES}
	index={sliderIndexAtFirst}
	priority={1}
	loadMode={MODE_SLIDER_LOAD_AUTO}
	orientation={ORIENTATITON_SLIDER_VERTICAL}
	scrollMode={MODE_SCROLL_SLIDER_ITEM}
	scrollDuration={SLIDER_PAGES_SCROLL_DURATION}
	waitDuration={SLIDER_PAGES_WAIT_DURATION}
>
	<section id="slider-content-homepage" class="slider-content slider-content-page flex f-column h-100vh o-hidden">
		<SliderItemPage
			sliderId={SLIDER_ID_PAGES}
			scrollMode={MODE_SCROLL_SLIDER_ITEM}
			{sliderIndexAtFirst}
			maxColumnOrRowCount={1}
			totalElementCountAtFirst={5}
			selfIndex={0}
		/>

		<SliderItemPage
			sliderId={SLIDER_ID_PAGES}
			classes="h-100vh"
			scrollMode={MODE_SCROLL_SLIDER_ITEM}
			{sliderIndexAtFirst}
			maxColumnOrRowCount={1}
			totalElementCountAtFirst={5}
			selfIndex={1}
			fullWidth
			noPaddingTopForHeader
		>
			<HotCoffees parentSliderIndexAtFirst={sliderIndexAtFirst} parentSliderItemSelfIndex={1} />
		</SliderItemPage>

		<SliderItemPage
			sliderId={SLIDER_ID_PAGES}
			classes="h-100vh"
			scrollMode={MODE_SCROLL_SLIDER_ITEM}
			{sliderIndexAtFirst}
			maxColumnOrRowCount={1}
			totalElementCountAtFirst={5}
			selfIndex={2}
			fullWidth
			noPaddingTopForHeader
		>
			<ColdCoffees parentSliderIndexAtFirst={sliderIndexAtFirst} parentSliderItemSelfIndex={2} />
		</SliderItemPage>

		<SliderItemPage
			sliderId={SLIDER_ID_PAGES}
			scrollMode={MODE_SCROLL_SLIDER_ITEM}
			{sliderIndexAtFirst}
			maxColumnOrRowCount={1}
			totalElementCountAtFirst={5}
			selfIndex={3}
		/>

		<SliderItemPage
			sliderId={SLIDER_ID_PAGES}
			scrollMode={MODE_SCROLL_SLIDER_ITEM}
			{sliderIndexAtFirst}
			maxColumnOrRowCount={1}
			totalElementCountAtFirst={5}
			selfIndex={4}
		/>

		<SliderItemPage
			sliderId={SLIDER_ID_PAGES}
			scrollMode={MODE_SCROLL_SLIDER_ITEM}
			{sliderIndexAtFirst}
			maxColumnOrRowCount={1}
			totalElementCountAtFirst={5}
			selfIndex={5}
		>
			<Contact />
		</SliderItemPage>
	</section>
</Slider>

<style>
	.slider-content-page {
		--grid-item-min-width: 0rem;
		--grid-layout-gap: 0rem;
		--grid-max-column-or-row-count: 1;
		--gap-count: calc(var(--grid-max-column-or-row-count) - 1);
		--total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
		--grid-item-max-width: calc(100% - var(--total-gap-width)) / var(--grid-max-column-or-row-count);
	}
</style>
