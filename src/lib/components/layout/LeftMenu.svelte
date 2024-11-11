<script>
	import { PUBLIC_DEFAULT_LANGUAGE } from "$env/static/public";
	import { LEFT_MENU_TRANSITION_DURATION, RIPPLE_TYPE_ONE_DURATION } from "$lib/js/client/constants.client";
	import { EVENT_SLIDE_TO_INDEX, SLIDER_ID_PAGES } from "$lib/js/client/constants.slider.client";
	import { L } from "$lib/js/client/localization/localization.translations.data.client.app";
	import { changeLanguage, getStore, performRippleEffect, waitFor } from "$lib/js/client/util.client";
	import { closeLastLeftMenu } from "$lib/js/client/util.left.menus.client.common";
	import {
		getLocalizedSearchParam,
		getLocalizedSearchValue,
	} from "$lib/js/common/localization/localization.util.common";

	export let activeIndex;

	const lang = getStore("lang");

	async function onItemClick(event, index) {
		event.preventDefault();

		performRippleEffect(event);
		await waitFor(RIPPLE_TYPE_ONE_DURATION / 2);

		closeLastLeftMenu();
		await waitFor(LEFT_MENU_TRANSITION_DURATION);

		window.dispatchEvent(new CustomEvent(EVENT_SLIDE_TO_INDEX + "_" + SLIDER_ID_PAGES, { detail: index }));
	}

	async function startChangingLanguage(event, newLang) {
		performRippleEffect(event);
		await waitFor(RIPPLE_TYPE_ONE_DURATION);

		changeLanguage(newLang);
	}
</script>

<article class="wrapper flex f-column g-3 h-100">
	<div class="logo-big b-r-d" />

	<div class="flex f-column j-c-s-b g-3 h-100">
		<article class="flex f-column g-v-d">
			<article class="pages-t-hint t-hint unimportant-text-color">{L("pages", $lang)}</article>

			<a
				href="/{$lang === PUBLIC_DEFAULT_LANGUAGE ? '' : $lang}"
				class="menu-item flex g-1dot25 a-i-c pointer"
				on:click={(event) => onItemClick(event, 0)}
			>
				<svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
					<path
						d="M0 80C0 53.5 21.5 32 48 32h96c26.5 0 48 21.5 48 48V96H384V80c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H432c-26.5 0-48-21.5-48-48V160H192v16c0 1.7-.1 3.4-.3 5L272 288h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H272c-26.5 0-48-21.5-48-48V336c0-1.7 .1-3.4 .3-5L144 224H48c-26.5 0-48-21.5-48-48V80z"
					/>
				</svg>

				<div class="menu-text" class:active-link={activeIndex === 0}>{L("homepage", $lang)}</div>
			</a>

			<a
				href="?{getLocalizedSearchParam('page', $lang)}={getLocalizedSearchValue('hot-coffees', $lang)}"
				class="menu-item flex g-1dot25 a-i-c pointer"
				on:click={(event) => onItemClick(event, 1)}
			>
				<svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
					<path
						d="M0 80C0 53.5 21.5 32 48 32h96c26.5 0 48 21.5 48 48V96H384V80c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H432c-26.5 0-48-21.5-48-48V160H192v16c0 1.7-.1 3.4-.3 5L272 288h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H272c-26.5 0-48-21.5-48-48V336c0-1.7 .1-3.4 .3-5L144 224H48c-26.5 0-48-21.5-48-48V80z"
					/>
				</svg>

				<div class="menu-text" class:active-link={activeIndex === 1}>{L("hotCoffees", $lang)}</div>
			</a>

			<a
				href="?{getLocalizedSearchParam('page', $lang)}={getLocalizedSearchValue('cold-coffees', $lang)}"
				class="menu-item flex g-1dot25 a-i-c pointer"
				on:click={(event) => onItemClick(event, 2)}
			>
				<svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
					<path
						d="M0 80C0 53.5 21.5 32 48 32h96c26.5 0 48 21.5 48 48V96H384V80c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H432c-26.5 0-48-21.5-48-48V160H192v16c0 1.7-.1 3.4-.3 5L272 288h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H272c-26.5 0-48-21.5-48-48V336c0-1.7 .1-3.4 .3-5L144 224H48c-26.5 0-48-21.5-48-48V80z"
					/>
				</svg>

				<div class="menu-text" class:active-link={activeIndex === 2}>{L("coldCoffees", $lang)}</div>
			</a>

			<a
				href="?{getLocalizedSearchParam('page', $lang)}={getLocalizedSearchValue('gallery', $lang)}"
				class="menu-item flex g-1dot25 a-i-c pointer"
				on:click={(event) => onItemClick(event, 3)}
			>
				<svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
					<path
						d="M0 80C0 53.5 21.5 32 48 32h96c26.5 0 48 21.5 48 48V96H384V80c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H432c-26.5 0-48-21.5-48-48V160H192v16c0 1.7-.1 3.4-.3 5L272 288h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H272c-26.5 0-48-21.5-48-48V336c0-1.7 .1-3.4 .3-5L144 224H48c-26.5 0-48-21.5-48-48V80z"
					/>
				</svg>

				<div class="menu-text" class:active-link={activeIndex === 3}>{L("gallery", $lang)}</div>
			</a>

			<a
				href="?{getLocalizedSearchParam('page', $lang)}={getLocalizedSearchValue('about-us', $lang)}"
				class="menu-item flex g-1dot25 a-i-c pointer"
				on:click={(event) => onItemClick(event, 4)}
			>
				<svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
					<path
						d="M0 80C0 53.5 21.5 32 48 32h96c26.5 0 48 21.5 48 48V96H384V80c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H432c-26.5 0-48-21.5-48-48V160H192v16c0 1.7-.1 3.4-.3 5L272 288h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H272c-26.5 0-48-21.5-48-48V336c0-1.7 .1-3.4 .3-5L144 224H48c-26.5 0-48-21.5-48-48V80z"
					/>
				</svg>

				<div class="menu-text" class:active-link={activeIndex === 4}>{L("aboutUs", $lang)}</div>
			</a>

			<a
				href="?{getLocalizedSearchParam('page', $lang)}={getLocalizedSearchValue('contact', $lang)}"
				class="menu-item flex g-1dot25 a-i-c pointer"
				on:click={(event) => onItemClick(event, 5)}
			>
				<svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
					<path
						d="M0 80C0 53.5 21.5 32 48 32h96c26.5 0 48 21.5 48 48V96H384V80c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H432c-26.5 0-48-21.5-48-48V160H192v16c0 1.7-.1 3.4-.3 5L272 288h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H272c-26.5 0-48-21.5-48-48V336c0-1.7 .1-3.4 .3-5L144 224H48c-26.5 0-48-21.5-48-48V80z"
					/>
				</svg>

				<div class="menu-text" class:active-link={activeIndex === 5}>{L("contact", $lang)}</div>
			</a>
		</article>

		<div class="flex f-column g-v-d">
			<article class="t-hint unimportant-text-color">{L("language", $lang)}</article>

			<article class="menu-item flex g-1dot25 a-i-c pointer" on:click={(event) => startChangingLanguage(event, "tr")}>
				<svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
					<circle cx="32" cy="32" r="32" fill="red" />
					<g fill="#fff">
						<path d="m41.3 39 .1-5.4L36 32l5.4-1.6-.1-5.4 3.3 4.3 5.4-1.6-3.3 4.3 3.3 4.3-5.4-1.6z" />
						<path
							d="M33.2 44c-6.6 0-11.9-5.4-11.9-12s5.3-12 11.9-12c2.5 0 4.8.8 6.8 2.1C37.3 19 33.3 17 28.8 17 20.6 17 14 23.7 14 32s6.6 15 14.8 15c4.5 0 8.5-2 11.2-5.1-1.9 1.3-4.2 2.1-6.8 2.1"
						/>
					</g>
				</svg>

				<div class="menu-text" class:active-link={$lang === "tr"}>{L("turkish", $lang)}</div>
			</article>

			<article class="menu-item flex g-1dot25 a-i-c pointer" on:click={(event) => startChangingLanguage(event, "en")}>
				<svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
					<mask id="menu-en">
						<circle cx="256" cy="256" r="256" fill="#fff" />
					</mask>
					<g mask="url(#menu-en)">
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

				<div class="menu-text" class:active-link={$lang === "en"}>{L("english", $lang)}</div>
			</article>

			<article class="t-hint unimportant-text-color">{L("theme", $lang)}</article>

			<article class="theme-switcher-wrapper b-r-d" />
		</div>
	</div>
</article>

<style>
	.logo-big {
		height: 5rem;

		background-color: var(--secondary-background-color);
	}

	.menu-icon {
		width: 1.75rem;
		height: 1.75rem;
		fill: var(--accent-color);
	}

	.t-hint {
		margin-top: calc(var(--main-v-padding) / 2);
	}

	.menu-text {
		color: var(--secondary-text-color);
		font-size: 0.8rem;
		letter-spacing: 0.01rem;

		transition: color 0.25s ease-in-out;
	}

	@media (hover: hover) {
		.menu-icon {
			transition: fill 0.25s ease-in-out;
		}

		.menu-text {
			transition: color 0.25s ease-in-out;
		}

		.menu-item:hover .menu-text {
			color: var(--accent-color);
		}
	}
</style>
