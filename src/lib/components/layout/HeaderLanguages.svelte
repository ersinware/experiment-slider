<script>
	import { EVENT_CLOSE_LANGUAGES, RIPPLE_TYPE_ONE_DURATION } from "$lib/js/client/constants.client";
	import { L } from "$lib/js/client/localization/localization.translations.data.client.app";
	import { changeLanguage, getStore, performRippleEffect, waitFor } from "$lib/js/client/util.client";
	import { cubicInOut } from "svelte/easing";
	import { fly } from "svelte/transition";

	const lang = getStore("lang"),
		transitionDuration = 400;

	async function startChangingLanguage(event, newLang) {
		performRippleEffect(event);
		await waitFor(RIPPLE_TYPE_ONE_DURATION / 2);

		window.dispatchEvent(new CustomEvent(EVENT_CLOSE_LANGUAGES));

		await waitFor(transitionDuration);
		changeLanguage(newLang);
	}
</script>

<div id="header-languages" class="wrapper p-a p-c-h t-0">
	<article
		class="content flex f-column g-dot75 secondary-background-color b-r-d"
		transition:fly={{ y: 12, easing: cubicInOut, duration: transitionDuration }}
	>
		<article class="lang-item flex a-i-c g-dot75" on:click={(event) => startChangingLanguage(event, "tr")}>
			<div class="lang-icon">
				<svg class="lang-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
					<circle cx="32" cy="32" r="32" fill="red" />
					<g fill="#fff">
						<path d="m41.3 39 .1-5.4L36 32l5.4-1.6-.1-5.4 3.3 4.3 5.4-1.6-3.3 4.3 3.3 4.3-5.4-1.6z" />
						<path
							d="M33.2 44c-6.6 0-11.9-5.4-11.9-12s5.3-12 11.9-12c2.5 0 4.8.8 6.8 2.1C37.3 19 33.3 17 28.8 17 20.6 17 14 23.7 14 32s6.6 15 14.8 15c4.5 0 8.5-2 11.2-5.1-1.9 1.3-4.2 2.1-6.8 2.1"
						/>
					</g>
				</svg>
			</div>

			<div class="navigation-page-item" class:active-link={$lang === "tr"}>{L("turkish", $lang)}</div>
		</article>

		<article class="lang-item flex a-i-c g-dot75" on:click={(event) => startChangingLanguage(event, "en")}>
			<div class="lang-icon">
				<svg class="lang-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
					<mask id="hoverable-en">
						<circle cx="256" cy="256" r="256" fill="#fff" />
					</mask>
					<g mask="url(#hoverable-en)">
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
			</div>

			<div class="navigation-page-item" class:active-link={$lang === "en"}>{L("english", $lang)}</div>
		</article>
	</article>
</div>

<style>
	@media (min-width: 65.001em) {
		.wrapper {
			padding-top: calc(var(--header-height) - (var(--header-height) - 1.75rem) / 2);
		}

		.content {
			padding: calc(var(--main-h-padding) * 0.75);
		}

        .lang-icon {
            width: 1.5rem;
            height: 1.5rem;
        }

		.navigation-page-item {
			font-size: 0.8rem;
		}

		@media (hover: hover) {
			.navigation-page-item {
				transition: color 0.25s ease-in-out;
			}

			.lang-item:hover .navigation-page-item {
				color: var(--accent-color);
			}
		}
	}
</style>
