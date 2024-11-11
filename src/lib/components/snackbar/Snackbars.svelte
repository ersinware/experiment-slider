<script>
	import { getStore } from '$lib/js/client/util.client';
	import Snackbar from './Snackbar.svelte';
    import {flip} from "svelte/animate";

    const openSnackbars = getStore('openSnackbars')
</script>

<div class="wrapper p-none p-f p-c-h flex f-column a-i-c g-1dot5 full-w-for-absolute-and-fixed w-100">
    {#each $openSnackbars as snackbar (snackbar)}
        <div animate:flip>
            <Snackbar --content-color={snackbar.contentColor ?? ''}
                      --snackbar-background-color={snackbar.backgroundColor ?? ''}
                      --positive-button-color={snackbar.positiveButtonColor ?? ''}
                      --negative-button-color={snackbar.negativeButtonColor ?? ''}
                      id={snackbar.id}
                      content={snackbar.content}
                      actions={snackbar.actions}/>
        </div>
    {/each}
</div>

<style>
    .wrapper {
        z-index: 9999999999;
        max-width: calc(100% - 2 * var(--main-h-padding))
    }

    @media (min-width: 65.001em) {
        .wrapper {
            bottom: calc(var(--main-v-padding) * 1.5);
        }
    }

    @media (max-width: 65em) {
        .wrapper {
            top: calc(var(--main-v-padding) + .35rem);
        }
    }
</style>