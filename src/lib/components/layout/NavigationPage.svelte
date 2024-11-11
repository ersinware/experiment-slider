<script>
	import { PUBLIC_DEFAULT_LANGUAGE } from "$env/static/public";
	import { EVENT_SLIDE_TO_INDEX, SLIDER_ID_PAGES } from "$lib/js/client/constants.slider.client";
	import { L } from "$lib/js/client/localization/localization.translations.data.client.app";
	import { getStore, performRippleEffect } from "$lib/js/client/util.client";
	import { onMountBigScreen, removeOnMountBigScreen } from "$lib/js/client/util.responsive.client";
	import {
		getLocalizedSearchParam,
		getLocalizedSearchValue,
	} from "$lib/js/common/localization/localization.util.common";
	import { onMount } from "svelte";

	export let activeIndex;

	const lang = getStore("lang");

	onMount(_onMount);

	function _onMount() {
		const id = "NavigationPage";
		let firstTime = true;

		onMountBigScreen({
			id,
			onMount: () => {
				if (!firstTime) return;

				const nodes = document.querySelectorAll("#navigation-page > a");
				for (let i = 0; i < nodes.length; i++) nodes[i].addEventListener("click", (event) => onItemClick(event, i));

				firstTime = false;
			},
		});

		return () => {
			removeOnMountBigScreen(id);
		};
	}

	function onItemClick(event, index) {
		event.preventDefault();

		performRippleEffect(event);
		window.dispatchEvent(new CustomEvent(EVENT_SLIDE_TO_INDEX + "_" + SLIDER_ID_PAGES, { detail: index }));
	}
</script>

<article id="navigation-page" class="flex a-i-c j-c-c g-2 h-100 for-big-screen">
	<a
		href="/{$lang === PUBLIC_DEFAULT_LANGUAGE ? '' : $lang}"
		class="navigation-page-item pointer"
		class:active-link={activeIndex === 0}>{L("homepage", $lang)}</a
	>
	<a
		href="?{getLocalizedSearchParam('page', $lang)}={getLocalizedSearchValue('hot-coffees', $lang)}"
		class="navigation-page-item pointer"
		class:active-link={activeIndex === 1}>{L("hotCoffees", $lang)}</a
	>
	<a
		href="?{getLocalizedSearchParam('page', $lang)}={getLocalizedSearchValue('cold-coffees', $lang)}"
		class="navigation-page-item pointer"
		class:active-link={activeIndex === 2}>{L("coldCoffees", $lang)}</a
	>
	<a
		href="?{getLocalizedSearchParam('page', $lang)}={getLocalizedSearchValue('gallery', $lang)}"
		class="navigation-page-item pointer"
		class:active-link={activeIndex === 3}>{L("gallery", $lang)}</a
	>
	<a
		href="?{getLocalizedSearchParam('page', $lang)}={getLocalizedSearchValue('about-us', $lang)}"
		class="navigation-page-item pointer"
		class:active-link={activeIndex === 4}>{L("aboutUs", $lang)}</a
	>
	<a
		href="?{getLocalizedSearchParam('page', $lang)}={getLocalizedSearchValue('contact', $lang)}"
		class="navigation-page-item pointer"
		class:active-link={activeIndex === 5}>{L("contact", $lang)}</a
	>
</article>

<style>
	@media (hover: hover) {
		.navigation-page-item {
			transition: color 0.25s ease-in-out;
		}

		.navigation-page-item:hover {
			color: var(--accent-color);
		}
	}
</style>
