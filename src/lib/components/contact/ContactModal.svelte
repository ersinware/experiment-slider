<script>
	import InputText from "$lib/components/inputs/InputText.svelte";
	import TextArea from "$lib/components/inputs/TextArea.svelte";
	import {
		MODAL_PROGRESS_BAR_NAVIGATED_TRANSITION_DURATION,
		MODAL_TRANSITION_DURATION,
		RIPPLE_TYPE_ONE_DURATION,
	} from "$lib/js/client/constants.client";
	import { L } from "$lib/js/client/localization/localization.translations.data.client.app";
	import { getStore, performRippleEffect, showSnackbar, waitFor } from "$lib/js/client/util.client";
	import { registerLampClick, unregisterLampClick } from "$lib/js/client/util.lamp.client";
	import { closeLastModal } from "$lib/js/client/util.modals.client.common";
	import {
	formatPhoneNumber,
		onValidityChange,
		validateEmailAddress,
		validateNameAndSurname,
		validatePhoneNumber,
		validateThoughts,
	} from "$lib/js/client/validations.client.panel";
	import { onMount } from "svelte";
	import Progress from "../Progress.svelte";

	const id = "contact-form",
		lang = getStore("lang"),
		arrFormValid = new Array(5),
		dontInterruptModal = getStore("dontInterruptModal");

	let formValid, form, state;

	$: formValid = onValidityChange(arrFormValid);

	onMount(_onMount);

	function _onMount() {
		registerLampClick(id, onLampClick);

		return () => {
			unregisterLampClick(id);
			$dontInterruptModal = false;
		};
	}

	function onLampClick(event) {
		if ($dontInterruptModal) return;

		performRippleEffect(event);
		closeLastModal();
	}

	async function onCancel(event) {
		performRippleEffect(event);
		await waitFor(RIPPLE_TYPE_ONE_DURATION / 2);

		closeLastModal();
	}

	async function onContinue(event) {
		state = "navigating";
		$dontInterruptModal = true;
		performRippleEffect(event);

		await waitFor(2000);
		const status = 404,
			body = null;

		if (status === 200) onSuccess();
		else onError(body?.error);
	}

	async function onSuccess() {
		state = "navigated";
		await waitFor(MODAL_PROGRESS_BAR_NAVIGATED_TRANSITION_DURATION);

		closeLastModal();
		await waitFor(MODAL_TRANSITION_DURATION);

		showSnackbar({ content: "Mesajınız başarıyla iletildi. Size dönüş yapacağız.", backgroundColor: "green" });
	}

	async function onError(error) {
		state = "navigated";
		await waitFor(MODAL_PROGRESS_BAR_NAVIGATED_TRANSITION_DURATION);
		$dontInterruptModal = false;

		showSnackbar({ content: error ?? "Bir hata oluştu. Daha sonra tekrar deneyin", backgroundColor: "indianred" });
	}
</script>

<form class="modal-content-wrapper flex f-column g-v-d t-a-c o-hidden" bind:this={form}>
	<Progress bind:state forModal />

	<div class="modal-title f-w-700">{L("contactFormTitle", $lang)}</div>

	<div class="modal-inputs flex small-screen-f-column small-screen-g-v-d big-screen-g-h-d w-100">
		<InputText
			type="text"
			title={L("name", $lang)}
			name="name"
			tText={L('tTextNameAndSurname', $lang)}
			validate={validateNameAndSurname}
			bind:valid={arrFormValid[0]}
		/>

		<InputText
			type="text"
			title={L("surname", $lang)}
			name="surname"
			tText={L('tTextNameAndSurname', $lang)}
			validate={validateNameAndSurname}
			bind:valid={arrFormValid[1]}
			optional
		/>
	</div>

	<div class="modal-inputs flex small-screen-f-column small-screen-g-v-d big-screen-g-h-d w-100">
		<InputText
			type="mail"
			title={L("mail", $lang)}
			name="email"
			tText={L('tTextEmail', $lang)}
			validate={validateEmailAddress}
			bind:valid={arrFormValid[2]}
		/>

		<InputText
			type="text"
			title={L("phone", $lang)}
			name="phone"
			tText={L('tTextPhone', $lang)}
            format={formatPhoneNumber}
			validate={validatePhoneNumber}
			bind:valid={arrFormValid[3]}
			optional
		/>
	</div>

	<TextArea
		type="text"
		title={L("thoughts", $lang)}
		name="thoughts"
		tText={L('tTextThoughts', $lang)}
		rows={7}
		validate={validateThoughts}
		bind:valid={arrFormValid[4]}
		enterKeyHint="done"
	/>

	<div class="modal-buttons flex j-c-c g-h-d">
		<button
			type="button"
			disabled={$dontInterruptModal}
			class="nude-button modal-button modal-unimportant-negative-button"
			class:disabled-button={$dontInterruptModal}
			on:click={onCancel}
		>
			{L("cancel", $lang)}
		</button>

		<button
			type="button"
			disabled={!formValid || $dontInterruptModal}
			class:disabled-button={!formValid || $dontInterruptModal}
			class="nude-button modal-button modal-positive-button"
			on:click={onContinue}
		>
			{L("send", $lang)}
		</button>
	</div>
</form>
