<script>
	import { getStore, getTransition } from "$lib/js/client/util.client.js";
	import {
		onMountHoverable,
		onMountHoverableReverse,
		removeOnHoverable,
		removeOnHoverableReverse,
	} from "$lib/js/client/util.responsive.client";
	import { randomID } from "$lib/js/common/util.common";
	import { onMount } from "svelte";
	import { fly } from "svelte/transition";

	export let wrapperStyle, tooltipStyle, text, visible, bottom, manual, dontCloseOnHover;

	let wrapper;

	const id = randomID(),
		hoverable = getStore("hoverable"),
		touchable = getStore("touchable"),
		transition = { y: bottom ? 8 : -8 };

	onMount(_onMount);

	function _onMount() {
		if (manual) return;

		onMountHoverable({
			id,
			onMount: () => {
				wrapper.addEventListener("mouseenter", onMouseEnter);
				wrapper.addEventListener("mouseleave", onMouseLeave);
			},
		});

		onMountHoverableReverse({
			id,
			reverse: () => {
				wrapper.removeEventListener("mouseenter", onMouseEnter);
				wrapper.removeEventListener("mouseleave", onMouseLeave);
			},
		});

		return () => {
			removeOnHoverable(id);
			removeOnHoverableReverse(id);

			wrapper.removeEventListener("mouseenter", onMouseEnter);
			wrapper.removeEventListener("mouseleave", onMouseLeave);
		};
	}

	function onTooltipCreate(tooltip) {
		if ($hoverable) tooltip.addEventListener("mouseenter", onTooltipMouseEnter);

		if ($touchable) tooltip.addEventListener("touchstart", onTouchStart);
	}

	function onMouseEnter() {
		if (manual) return;

		visible = true;
	}

	function onMouseLeave() {
		if (manual) return;

		visible = false;
	}

	function onTooltipMouseEnter() {
		if (manual && dontCloseOnHover !== undefined && !dontCloseOnHover) visible = false;
	}

	function onTouchStart(event) {
		visible = false;

		event.preventDefault();
		event.stopPropagation();
	}
</script>

<div style={wrapperStyle ?? ""} class="wrapper p-r w-100" bind:this={wrapper}>
	<slot />

	{#if visible}
		<div
			style={tooltipStyle ?? ""}
			class="tooltip b-box p-a t-a-c f-w-600 pointer"
			class:bottom
			use:onTooltipCreate
			in:fly={transition}
			out:fly={getTransition(transition)}
		>
			{text}
		</div>
	{/if}
</div>

<style>
	.wrapper {
		display: var(--tooltip-display, block);
	}

	.tooltip {
		top: calc(var(--tooltip-distance, var(--default-tooltip-distance)) * -1);
		left: 50%;
		transform: translate(-50%, -100%);
		margin-right: -50%;
		z-index: 98;

		max-width: var(--tooltip-max-width, max(100%, 17.5rem));
		width: var(--tooltip-width, unset);
		line-height: 0.7rem;

		padding: 0.5rem 1rem calc(0.5rem + 1px);

		color: var(--tooltip-text-color, --text-color);
		background-color: var(--tooltip-background-color, var(--tooltip-background-color-default));

		font-size: 0.7rem;

		border-radius: calc(var(--border-radius) - 0.25rem);
		white-space: var(--tooltip-white-space, unset);

		transition: color 0.25s ease-in-out, background-color 0.25s ease-in-out;
	}

	.tooltip:after {
		content: "";

		position: absolute;
		top: 95%;
		left: 50%;
		z-index: 988;

		margin-left: -0.6rem;
		border-width: 0.6rem;
		border-style: solid;
		border-color: var(--tooltip-background-color, var(--tooltip-background-color-default)) transparent transparent
			transparent;

		transition: border 0.25s ease-in-out;
	}

	.bottom {
		top: unset;
		bottom: calc(var(--tooltip-distance, 1rem) * -1);
		transform: translate(-50%, 100%);
	}

	.bottom:after {
		top: unset;
		bottom: 95%;
		border-color: transparent transparent var(--tooltip-background-color, var(--tooltip-background-color-default))
			transparent;
	}

	@media (min-width: 65.001em) {
		.wrapper {
			--default-tooltip-distance: 1rem;
		}
	}

	@media (max-width: 65em) {
		.wrapper {
			--default-tooltip-distance: 1rem;
		}

		.tooltip {
			padding-top: 0.6rem;
			padding-bottom: calc(0.5rem + 1px);
		}
	}
</style>
