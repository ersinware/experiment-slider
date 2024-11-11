<script>
	import { RIPPLE_TYPE_ONE_DURATION } from "$lib/js/client/constants.client";
	import { L } from "$lib/js/client/localization/localization.translations.data.client.app";
	import { getStore, performRippleEffect, waitFor } from "$lib/js/client/util.client";
	import { openModal } from "$lib/js/client/util.modals.client.common";
	import ContactModal from "./ContactModal.svelte";

	const lang = getStore("lang");

	async function onButtonClick(event) {
		performRippleEffect(event);
		await waitFor(RIPPLE_TYPE_ONE_DURATION / 2);

		openModal({ component: ContactModal });
	}
</script>

<article class="flex f-column a-i-c j-c-c p-h-d t-a-c big-screen-g-2dot5 small-screen-g-2 small-screen-m-h-auto">
	<div>
		<div class="t-hint unimportant-text-color">{L("contactBeautify", $lang)}</div>
		<h1 class="section-title">{L("contactTitle", $lang)}</h1>
	</div>

	<p class="section-text">{L("contactText", $lang)}</p>

	<button class="nude-button section-bottom" on:click={onButtonClick}>{L("contactUs", $lang)}</button>
</article>

<style>
	.section-text {
		max-width: 35rem;
	}

	.t-hint {
		margin-bottom: 1.5rem;
	}
</style>
