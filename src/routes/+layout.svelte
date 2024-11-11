<script>
	import { browser } from "$app/environment";
	import { afterNavigate, beforeNavigate } from "$app/navigation";
	import { page } from "$app/stores";
	import DynamicLeftMenus from "$lib/components/DynamicLeftMenus.svelte";
	import DynamicModals from "$lib/components/DynamicModals.svelte";
	import Lamp from "$lib/components/Lamp.svelte";
	import Ripple from "$lib/components/Ripple.svelte";
	import Snackbars from "$lib/components/snackbar/Snackbars.svelte";
	import "$lib/css/global.css";
	import "$lib/css/inputs.css";
	import "$lib/css/project.global.css";
	import { createStore, getStore, init as initUtil } from "$lib/js/client/util.client.js";
	import { init as initLeftMenus } from "$lib/js/client/util.left.menus.client.common.js";
	import { init as initModals } from "$lib/js/client/util.modals.client.common.js";
	import { init as initUtilResponsive } from "$lib/js/client/util.responsive.client.js";
	import { init as initLocalizationUtil } from "$lib/js/common/localization/localization.util.common";

	export let data;

	createStores();
	beforeNavigate(_beforeNavigate);
	afterNavigate(_afterNavigate);

	const theme = getStore("theme"),
		navigationState = getStore("navigationState");

	let firstTime;

	if (browser) init();

	function createStores() {
		createStore("touchable");
		createStore("hoverable");
		createStore("url", decodeURI($page.url.toString()));
		createStore("bigScreen");
		createStore("theme", data.theme);
		createStore("lang", data.lang);
		createStore("navigationState");
		createStore("openLeftMenus", []);
		createStore("openDynamicLeftMenus", []);
		createStore("rippleTargetInfo");
		createStore("openSnackbars", []);
		createStore("openModals", []);
		createStore("openDynamicModals", []);
		createStore("dontInterruptModal");
	}

	function _beforeNavigate() {
		if (navigation.type !== "leave") $navigationState = "navigating";
	}

	function _afterNavigate() {
		if (firstTime) {
			firstTime = false;

			return;
		}

		$navigationState = "navigated";
	}

	function init() {
		initUtil(
			navigationState,
			getStore("rippleTargetInfo"),
			getStore("lang"),
			getStore("openSnackbars"),
			getStore("bigScreen"),
			getStore("url"),
			getStore("dontInterruptModal")
		);
		initLeftMenus(getStore("openLeftMenus"), getStore("openDynamicLeftMenus"));
		initLocalizationUtil(data.paths, data.searchParams, data.searchValues);
		initUtilResponsive(getStore("touchable"), getStore("hoverable"), getStore("bigScreen"));
		initModals(getStore("openModals"), getStore("openDynamicModals"));
	}
</script>

<svelte:head>
	{#if $theme === "system"}
		<style>
			body {
				--background-color: rgb(255, 255, 255);
				--secondary-background-color: rgb(239, 239, 239);
				--third-background-color: rgb(215, 215, 215);
				--hoverable-content-background-color: rgb(239, 239, 239);
				--tooltip-background-color-default: rgb(222, 222, 222);
				--accent-color: #bc8cf2;
				--accent-color-darker: #bc8cf2;

				--title-color: rgb(24, 24, 24);
				--text-color: rgb(48, 48, 48);
				--secondary-text-color: rgb(72, 72, 72);
				--secondary-text-color-for-text-shadow: rgba(72, 72, 72, 0.3);
				--text-color-unimportant: rgb(159, 159, 159);

				--error-color: indianred;
				--error-color-darker: rgb(185, 72, 72);

				--ripple-color: rgb(0, 0, 0, 0.1);
				--button-ripple-color: rgb(0, 0, 0, 0.2);

				--button-color: white;
				--divider-color: rgba(0, 0, 0, 0.05);
			}

			@media (max-width: 65.001em) {
				body {
					--hoverable-content-background-color: white;
				}
			}

			@media (prefers-color-scheme: dark) {
				body {
					--background-color: rgb(24, 24, 24);
					--secondary-background-color: rgb(36, 36, 36);
					--third-background-color: rgb(48, 48, 48);
					--hoverable-content-background-color: rgb(36, 36, 36);
					--tooltip-background-color-default: rgb(48, 48, 48);
					--accent-color: #bc8cf2;
					--accent-color-darker: #bc8cf2;

					--title-color: rgb(231, 231, 231);
					--text-color: rgb(207, 207, 207);
					--secondary-text-color: rgb(183, 183, 183);
					--text-color-unimportant: rgb(120, 120, 120);

					--error-color: indianred;
					--error-color-darker: rgb(185, 72, 72);

					--ripple-color: rgb(255, 255, 255, 0.1);
					--button-ripple-color: rgb(0, 0, 0, 0.2);

					--button-color: var(--title-color);
					--divider-color: rgba(255, 255, 255, 0.1);
				}

				img {
					filter: brightness(0.9);
				}
			}
		</style>
	{:else if $theme === "dark"}
		<style>
			body {
				--background-color: rgb(24, 24, 24);
				--secondary-background-color: rgb(36, 36, 36);
				--third-background-color: rgb(48, 48, 48);
				--hoverable-content-background-color: rgb(36, 36, 36);
				--tooltip-background-color-default: rgb(48, 48, 48);
				--accent-color: #bc8cf2;
				--accent-color-darker: #bc8cf2;

				--title-color: rgb(231, 231, 231);
				--text-color: rgb(207, 207, 207);
				--secondary-text-color: rgb(183, 183, 183);
				--text-color-unimportant: rgb(120, 120, 120);

				--error-color: indianred;
				--error-color-darker: rgb(185, 72, 72);

				--ripple-color: rgb(255, 255, 255, 0.1);
				--button-ripple-color: rgb(0, 0, 0, 0.2);

				--button-color: var(--title-color);
				--divider-color: rgba(255, 255, 255, 0.1);
			}

			img {
				filter: brightness(0.9);
			}
		</style>
	{:else if $theme === "bright"}
		<style>
			body {
				--background-color: rgb(255, 255, 255);
				--secondary-background-color: rgb(239, 239, 239);
				--third-background-color: rgb(215, 215, 215);
				--hoverable-content-background-color: rgb(239, 239, 239);
				--tooltip-background-color-default: rgb(222, 222, 222);
				--accent-color: #bc8cf2;
				--accent-color-darker: #bc8cf2;

				--title-color: rgb(24, 24, 24);
				--text-color: rgb(48, 48, 48);
				--secondary-text-color: rgb(72, 72, 72);
				--text-color-unimportant: rgb(159, 159, 159);

				--error-color: indianred;
				--error-color-darker: rgb(185, 72, 72);

				--ripple-color: rgb(0, 0, 0, 0.1);
				--button-ripple-color: rgb(0, 0, 0, 0.2);

				--button-color: white;
				--divider-color: rgba(0, 0, 0, 0.1);
			}

			@media (max-width: 65em) {
				body {
					--hoverable-content-background-color: white;
				}
			}
		</style>
	{/if}
</svelte:head>

<slot />

<Lamp />
<DynamicLeftMenus />
<DynamicModals />
<Ripple />
<Snackbars />
