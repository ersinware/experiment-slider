<script>
	import SliderItemCoffee from "$lib/components/coffees/SliderItemCoffee.svelte";
	import Slider from "$lib/components/slider/Slider.svelte";
	import {
		MODE_SCROLL_SLIDER_ITEM,
		MODE_SLIDER_LOAD_AUTO,
		MODE_SLIDER_LOAD_MANUAL,
	} from "$lib/js/client/constants.slider.client";

	export let sliderId, siblingId, dontPreload, orientationAtFirst, images, reverse;
</script>

<Slider
	id={sliderId}
	{siblingId}
	index={reverse ? images.length - 1 : 0}
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
		id={sliderId}
		class="slider-content flex o-hidden big-screen-f-column h-100"
		class:slider-content-reverse={reverse}
	>
		{#each images as image, index}
			<SliderItemCoffee
				{sliderId}
				scrollMode={MODE_SCROLL_SLIDER_ITEM}
				sliderIndexAtFirst={reverse ? images.length - 1 : 0}
				maxColumnOrRowCount={1}
				totalElementCountAtFirst={images.length}
				selfIndex={index}
				{dontPreload}
				{image}
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
