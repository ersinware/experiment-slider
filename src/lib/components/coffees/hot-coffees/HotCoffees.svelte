<script>
	import SliderCoffeeDescriptions from "$lib/components/coffees/SliderCoffeeDescriptions.svelte";
	import SliderCoffees from "$lib/components/coffees/SliderCoffees.svelte";
	import SliderParent from "$lib/components/slider/SliderParent.svelte";
	import { HOT_COFFEE_DESCRIPTIONS, HOT_COFFEE_IMAGES } from "$lib/js/client/coffee.data";
	import {
		EVENT_SLIDER_ITEM_LOADED,
		EVENT_SLIDER_LOAD,
		EVENT_SLIDER_LOAD_AGAIN,
		ORIENTATITON_SLIDER_HORIZONTAL,
		ORIENTATITON_SLIDER_VERTICAL,
		SLIDER_ID_HOT_COFFEES,
		SLIDER_ID_HOT_COFFEE_DESCRIPTONS,
		SLIDER_ID_PAGES,
	} from "$lib/js/client/constants.slider.client";
	import {
		onMountBigScreen,
		onMountSmallScreen,
		removeOnMountBigScreen,
		removeOnMountSmallScreen,
	} from "$lib/js/client/util.responsive.client";
	import { onMount } from "svelte";
	import { getOrientationAtFirst } from "$lib/js/client/util.client";

	export let parentSliderIndexAtFirst, parentSliderItemSelfIndex;

	const dontPreload = parentSliderItemSelfIndex !== parentSliderIndexAtFirst,
		eventPostfix = "_" + SLIDER_ID_PAGES + "_" + parentSliderItemSelfIndex,
		id = "HotCoffees";

	let orientationAtFirst = getOrientationAtFirst();

	onMount(_onMount);

	async function _onMount() {
		if (!dontPreload) onParentSliderItemLoaded();
		else window.addEventListener(EVENT_SLIDER_ITEM_LOADED + eventPostfix, onParentSliderItemLoaded);

		return () => {
			window.removeEventListener(EVENT_SLIDER_ITEM_LOADED + eventPostfix, onParentSliderItemLoaded);
			removeOnMountBigScreen(id);
			removeOnMountSmallScreen(id);
		};
	}

	function onParentSliderItemLoaded() {
		let firstTime = true;

		onMountBigScreen({
			id,
			onMount: () => {
				if (firstTime) return;

				const detail = { orientation: ORIENTATITON_SLIDER_VERTICAL };
				window.dispatchEvent(new CustomEvent(EVENT_SLIDER_LOAD_AGAIN + "_" + SLIDER_ID_HOT_COFFEES, { detail }));
				window.dispatchEvent(
					new CustomEvent(EVENT_SLIDER_LOAD_AGAIN + "_" + SLIDER_ID_HOT_COFFEE_DESCRIPTONS, { detail })
				);
			},
		});

		onMountSmallScreen({
			id,
			onMount: () => {
				if (firstTime) return;

				const detail = { orientation: ORIENTATITON_SLIDER_HORIZONTAL };
				window.dispatchEvent(new CustomEvent(EVENT_SLIDER_LOAD_AGAIN + "_" + SLIDER_ID_HOT_COFFEES, { detail }));
				window.dispatchEvent(
					new CustomEvent(EVENT_SLIDER_LOAD_AGAIN + "_" + SLIDER_ID_HOT_COFFEE_DESCRIPTONS, { detail })
				);
			},
		});

		const detail = { orientation: getOrientationAtFirst() };
		window.dispatchEvent(new CustomEvent(EVENT_SLIDER_LOAD + "_" + SLIDER_ID_HOT_COFFEES, { detail }));
		window.dispatchEvent(new CustomEvent(EVENT_SLIDER_LOAD + "_" + SLIDER_ID_HOT_COFFEE_DESCRIPTONS, { detail }));

		firstTime = false;
	}
</script>

<SliderParent ids={[SLIDER_ID_HOT_COFFEES, SLIDER_ID_HOT_COFFEE_DESCRIPTONS]} priority={2}>
	<div class="slider-content w-100 h-100vh">
		<div
			class="b-box max-w m-h-auto h-100vh big-screen-flex big-screen-f-row-reverse big-screen-f-s-e big-screen-w-100 small-screen-grid small-screen-a-c-c small-screen-g-2 small-screen-w-100vw small-screen-p-b-d"
		>
			<SliderCoffees
				sliderId={SLIDER_ID_HOT_COFFEES}
				siblingId={SLIDER_ID_HOT_COFFEE_DESCRIPTONS}
				{dontPreload}
				{orientationAtFirst}
				images={HOT_COFFEE_IMAGES}
			/>
			<SliderCoffeeDescriptions
				sliderId={SLIDER_ID_HOT_COFFEE_DESCRIPTONS}
				siblingId={SLIDER_ID_HOT_COFFEES}
				{dontPreload}
				{orientationAtFirst}
				descriptions={HOT_COFFEE_DESCRIPTIONS}
				reverse
			/>
		</div>
	</div>
</SliderParent>
