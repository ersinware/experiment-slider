<script>
	import { page } from "$app/stores";
	import NavigationPage from "$lib/components/layout/NavigationPage.svelte";
	import {
		ACTIVE_OPTION_IN_TRANSITION,
		EVENT_CLOSE_LANGUAGES,
		RIPPLE_TYPE_ONE_DURATION,
	} from "$lib/js/client/constants.client";
	import {
		EVENT_SLIDE_STARTED,
		SLIDER_ID_PAGES,
		SLIDER_PAGES_SCROLL_DURATION,
	} from "$lib/js/client/constants.slider.client";
	import { getStore, getTransition, performRippleEffect, waitFor } from "$lib/js/client/util.client";
	import { anyOpenLeftMenu, closeLastLeftMenu, openLeftMenu } from "$lib/js/client/util.left.menus.client.common";
	import {
		onMountBigScreen,
		onMountBigScreenReverse,
		onMountHoverable,
		onMountHoverableReverse,
		onMountSmallScreen,
		onMountSmallScreenReverse,
		onMountTouchable,
		onMountTouchableReverse,
		removeAllPointerRelated,
		removeAllScreenRelated,
	} from "$lib/js/client/util.responsive.client";
	import { onMount } from "svelte";
	import { fly } from "svelte/transition";
	import HeaderLanguages from "./HeaderLanguages.svelte";
	import LeftMenu from "./LeftMenu.svelte";

	const lang = getStore("lang");

	let eventPostfix = "_" + SLIDER_ID_PAGES,
		activeIndex = $page.data.sliderIndexAtFirst,
		showLanguages;

	onMount(_onMount);

	function _onMount() {
		const id = "header",
			languageSwitcher = document.getElementById("language-switcher-wrapper-header"),
			menuIcon = document.getElementById("menu-icon");

		window.addEventListener(EVENT_SLIDE_STARTED + eventPostfix, onSlideStarted);

		onMountHoverable({
			id,
			onMount: () => {
				window.addEventListener(EVENT_CLOSE_LANGUAGES, onLanguageMouseLeave);
				languageSwitcher.addEventListener("mouseenter", onLanguageMouseEnter);
				languageSwitcher.addEventListener("mouseleave", onLanguageMouseLeave);
			},
		});

		onMountHoverableReverse({
			id,
			reverse: () => {
				window.removeEventListener(EVENT_CLOSE_LANGUAGES, onLanguageMouseLeave);
				languageSwitcher.removeEventListener("mouseenter", onLanguageMouseEnter);
				languageSwitcher.removeEventListener("mouseleave", onLanguageMouseLeave);
			},
		});

		onMountBigScreen({
			id,
			onMount: () => {
				onMountTouchable({
					id,
					onMount: () => {
						languageSwitcher.addEventListener("click", onLanguageClick);
						languageSwitcher.addEventListener("mousedown", onLanguageDown);
						languageSwitcher.addEventListener("touchstart", onLanguageDown);

						document.body.addEventListener("mousedown", onBodyMouseDown);
						document.body.addEventListener("touchstart", onBodyMouseDown);
					},
				});

				onMountTouchableReverse({
					id,
					reverse: () => {
						showLanguages = false;
						clearTouchableListeners(languageSwitcher);
					},
				});
			},
		});

		onMountBigScreenReverse({
			id,
			reverse: () => {},
		});

		onMountSmallScreen({
			id,
			onMount: () => {
				menuIcon.addEventListener("click", onMenuClick);
			},
		});

		onMountSmallScreenReverse({
			id,
			reverse: () => {
				if (anyOpenLeftMenu()) closeLastLeftMenu();

				menuIcon.removeEventListener("click", onMenuClick);
			},
		});

		return () => {
			window.removeEventListener(EVENT_SLIDE_STARTED + eventPostfix, onSlideStarted);
			window.removeEventListener(EVENT_CLOSE_LANGUAGES, onLanguageMouseLeave);

			menuIcon.removeEventListener("click", onMenuClick);

			languageSwitcher.removeEventListener("mouseenter", onLanguageMouseEnter);
			languageSwitcher.removeEventListener("mouseleave", onLanguageMouseLeave);
			clearTouchableListeners(languageSwitcher);

			removeAllScreenRelated(id);
			removeAllPointerRelated(id);
		};
	}

	async function onSlideStarted(event) {
		await waitFor(SLIDER_PAGES_SCROLL_DURATION / 2);
		activeIndex = event.detail.to;
	}

	async function onMenuClick(event) {
		performRippleEffect(event);

		await waitFor(RIPPLE_TYPE_ONE_DURATION / 2);

		openLeftMenu({
			id: "leftMenu",
			component: LeftMenu,
			props: { activeIndex },
		});
	}

	/* */

	function onLanguageMouseEnter() {
		showLanguages = true;
	}

	function onLanguageMouseLeave() {
		showLanguages = false;
	}

	async function onLanguageClick(event) {
		performRippleEffect(event);
		await waitFor(RIPPLE_TYPE_ONE_DURATION / 2);

		showLanguages = !showLanguages;
	}

	function onLanguageDown(event) {
		event.stopPropagation();
	}

	function onBodyMouseDown() {
		showLanguages = false;
	}

	function clearTouchableListeners(languageSwitcher) {
		languageSwitcher.removeEventListener("click", onLanguageClick);
		languageSwitcher.removeEventListener("mousedown", onLanguageDown);
		languageSwitcher.removeEventListener("touchstart", onLanguageDown);

		document.body.removeEventListener("click", onBodyMouseDown);
		document.body.removeEventListener("mousedown", onBodyMouseDown);
		document.body.removeEventListener("touchstart", onBodyMouseDown);
	}
</script>

<header class="header b-box p-f p-c-h t-0 w-100 max-w p-h-d small-screen-p-t-d">
	<div class="header-content h-100 a-i-c big-screen-grid small-screen-flex small-screen-j-c-s-b">
		<svg
			id="menu-icon"
			class="menu-icon pointer h-100 for-small-screen"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M4 18H10" stroke="var(--title-color)" stroke-linecap="round" stroke-width="2" /><path
				d="M4 12L16 12"
				stroke="var(--title-color)"
				stroke-linecap="round"
				stroke-width="2"
			/>
			<path d="M4 6L20 6" stroke="var(--title-color)" stroke-linecap="round" stroke-width="2" />
		</svg>

		<img class="logo-header h-100 max-h-100" src="/logo.png" alt="" />

		<NavigationPage bind:activeIndex />

		<div class="header-right flex a-i-c j-c-r g-2 for-big-screen">
			<article id="language-switcher-wrapper-header" class="language-switcher-wrapper p-r pointer">
				{#if $lang === "tr"}
					<svg
						class="lang-icon"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 64 64"
						in:fly={getTransition(ACTIVE_OPTION_IN_TRANSITION)}
					>
						<circle cx="32" cy="32" r="32" fill="red" />
						<g fill="#fff">
							<path d="m41.3 39 .1-5.4L36 32l5.4-1.6-.1-5.4 3.3 4.3 5.4-1.6-3.3 4.3 3.3 4.3-5.4-1.6z" />
							<path
								d="M33.2 44c-6.6 0-11.9-5.4-11.9-12s5.3-12 11.9-12c2.5 0 4.8.8 6.8 2.1C37.3 19 33.3 17 28.8 17 20.6 17 14 23.7 14 32s6.6 15 14.8 15c4.5 0 8.5-2 11.2-5.1-1.9 1.3-4.2 2.1-6.8 2.1"
							/>
						</g>
					</svg>
				{:else}
					<svg
						class="lang-icon"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						in:fly={getTransition(ACTIVE_OPTION_IN_TRANSITION)}
					>
						<mask id="header-en">
							<circle cx="256" cy="256" r="256" fill="#fff" />
						</mask>
						<g mask="url(#header-en">
							<path
								fill="#eee"
								d="M256 0h256v64l-32 32 32 32v64l-32 32 32 32v64l-32 32 32 32v64l-256 32L0 448v-64l32-32-32-32v-64z"
							/>
							<path fill="#d80027" d="M224 64h288v64H224Zm0 128h288v64H256ZM0 320h512v64H0Zm0 128h512v64H0Z" />
							<path fill="#0052b4" d="M0 0h256v256H0Z" />
							<path
								fill="#eee"
								d="m187 243 57-41h-70l57 41-22-67zm-81 0 57-41H93l57 41-22-67zm-81 0 57-41H12l57 41-22-67zm162-81 57-41h-70l57 41-22-67zm-81 0 57-41H93l57 41-22-67zm-81 0 57-41H12l57 41-22-67Zm162-82 57-41h-70l57 41-22-67Zm-81 0 57-41H93l57 41-22-67zm-81 0 57-41H12l57 41-22-67Z"
							/>
						</g>
					</svg>
				{/if}

				{#if showLanguages}
					<HeaderLanguages />
				{/if}
			</article>

			<article class="theme-switcher-wrapper b-r-d" />
		</div>
	</div>

	<!-- <div class="h-divider for-big-screen" /> -->
</header>

<style>
	.header {
		z-index: 100;

		height: var(--header-height);
	}

	.header {
		backdrop-filter: blur(1rem);
	}

	.logo-header {
		max-height: var(--logo-height);
	}

	@media (min-width: 65.001em) {
		header {
			--logo-height: calc(var(--header-height) - 2.25rem);
		}

		.header-content {
			grid-template-columns: 1fr auto 1fr;
		}
	}

	@media (max-width: 65em) {
		header {
			--logo-height: calc(var(--header-height));
		}
	}
</style>
