<script>
	import { MODAL_TRANSITION_DURATION, MODAL_TRANSITION_Y } from "$lib/js/client/constants.client.js";
	import { getStore } from "$lib/js/client/util.client.js";
	import { fly } from "svelte/transition";

	const openDynamicModals = getStore("openDynamicModals"),
		bigScreen = getStore("bigScreen");
</script>

{#each $openDynamicModals as modal (modal.id)}
	<article
		style={modal.modalWrapperStyle ?? ""}
		class="modal-wrapper dynamic-modal-wrapper p-f"
		in:fly={modal.modalTransition ?? {
			y: $bigScreen ? -1 * MODAL_TRANSITION_Y : MODAL_TRANSITION_Y,
			duration: MODAL_TRANSITION_DURATION,
		}}
		out:fly={modal.modalTransition ?? {
			y: $bigScreen ? -1 * MODAL_TRANSITION_Y : MODAL_TRANSITION_Y,
			duration: MODAL_TRANSITION_DURATION,
		}}
	>
		<svelte:component this={modal.component} {...modal.props} />
	</article>
{/each}

<style>
</style>
