<script>
	import Tooltip from "$lib/components/Tooltip.svelte";
	import { L } from "$lib/js/client/localization/localization.translations.data.client.app";
	import { areEqualStrings, getStore, waitFor } from "$lib/js/client/util.client.js";
	import { onMount } from "svelte";

	export let name,
		type,
		title,
		value,
		tText,
		validate,
		valid,
		command,
		disable,
		optional,
		input,
		validInVisual,
		enterKeyHint,
		rows;

	const lang = getStore("lang"),
		bigScreen = getStore("bigScreen");

	let focus,
		exitedOnce,
		tVisible,
		editMode,
		firstValue,
		empty = !value;

	// $: onCommand(command)

	if (value) {
		editMode = true;
		firstValue = value;
		validInVisual = true;
		valid = "notEdited";
	}

	if (optional || disable) valid = true;

	onMount(_onMount);

	// function onCommand() {
	//     command = ''
	// }

	function _onMount() {
		if (input === document.activeElement) focus = true;
	}

	async function onFocus(event) {
		event.target.setSelectionRange(event.target.value.length, event.target.value.length);
		focus = true;
		tVisible = true;

		if ($bigScreen) return;

		await waitFor(250);
		event.target.scrollIntoView({ inline: "center", block: "center", behavior: "smooth" });

		await waitFor(250);
		event.target.scrollIntoView({ inline: "center", block: "center", behavior: "smooth" });
	}

	function onInput(event) {
		const newValue = event.target.value;
		if (!newValue) {
			empty = true;

			if (optional) {
				valid = true;
				validInVisual = undefined;
				tVisible = exitedOnce = false;

				return;
			}
		} else empty = false;

		const validation = validate(newValue, name);

		if (editMode && areEqualStrings(newValue.trim(), firstValue)) valid = "notEdited";
		else valid = validation;

		tVisible = !validation;

		if (exitedOnce) validInVisual = validation;
	}

	function onBlur(event) {
		focus = false;

		if (optional && !event.target.value) {
			tVisible = false;

			return;
		}

		if (exitedOnce) {
			tVisible = !validInVisual;

			return;
		}

		exitedOnce = true;

		if (validate(event.target.value, name)) {
			markValidInVisual();

			return;
		}

		markInvalidInVisual();
	}

	function markValidInVisual() {
		validInVisual = true;
		tVisible = false;
	}

	function markInvalidInVisual() {
		validInVisual = false;
		tVisible = true;
	}
</script>

<Tooltip
	--tooltip-background-color={validInVisual === false ? "indianred" : ""}
	--tooltip-text-color={validInVisual === false ? "white" : ""}
	text={tText}
	bind:visible={tVisible}
	bind:dontCloseOnHover={validInVisual}
	manual
>
	<div class="input-wrapper p-r">
		<textarea
			id={name}
			{name}
			value={value ?? ""}
			disabled={disable}
			enterkeyhint={enterKeyHint ?? "next"}
			{rows}
			class="input-text b-box w-100 t-a-c"
			class:focus
			class:empty
			class:valid={validInVisual}
			class:invalid={validInVisual === false}
			class:disabled={disable}
			bind:this={input}
			on:focus={onFocus}
			on:input={onInput}
			on:blur={onBlur}
		/>

		<label class="input-label p-none p-a p-c-h f-w-700" for={name}>
			{title}{optional ? " - " + L("optional", $lang) : ""}
		</label>
	</div>
</Tooltip>
