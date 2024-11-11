<script>
	import SliderItemCoffeeDescription from "$lib/components/coffees/SliderItemCoffeeDescription.svelte";
	import Slider from "$lib/components/slider/Slider.svelte";
	import {
		MODE_SCROLL_SLIDER_ITEM,
		MODE_SLIDER_LOAD_AUTO,
		MODE_SLIDER_LOAD_MANUAL,
	} from "$lib/js/client/constants.slider.client";

	export let sliderId, siblingId, dontPreload, orientationAtFirst, descriptions, reverse;
</script>

<Slider
	id={sliderId}
	{siblingId}
	index={reverse ? descriptions.length - 1 : 0}
	priority={2}
	loadMode={dontPreload ? MODE_SLIDER_LOAD_MANUAL : MODE_SLIDER_LOAD_AUTO}
	orientation={orientationAtFirst}
	scrollMode={MODE_SCROLL_SLIDER_ITEM}
	scrollDuration={750}
	waitDuration={0}
	{reverse}
	manualParent
>
	<section
		class="slider-content flex o-hidden big-screen-f-column big-screen-h-100vh big-screen-max-w-40"
		class:slider-content-reverse={reverse}
	>
		{#each descriptions as description, index}
			<SliderItemCoffeeDescription
				{sliderId}
				scrollMode={MODE_SCROLL_SLIDER_ITEM}
				sliderIndexAtFirst={reverse ? descriptions.length - 1 : 0}
				maxColumnOrRowCount={1}
				totalElementCountAtFirst={descriptions.length}
				selfIndex={index}
				{dontPreload}
				{description}
			/>
		{/each}
	</section>
</Slider>

<style>
	.slider-content {
		--grid-item-min-width: 0rem;
		--grid-max-column-or-row-count: 1;
		--grid-layout-gap: 0rem;
		--gap-count: calc(var(--grid-max-column-or-row-count) - 1);
		--total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
		--grid-item-max-width: calc(100% - var(--total-gap-width)) / var(--grid-max-column-or-row-count);
	}
</style>
