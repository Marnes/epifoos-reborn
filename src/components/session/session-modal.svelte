<script lang="ts">
import Modal from '$components/layout/modal.svelte';
import LoginForm from '$components/session/login-form.svelte';
import RegisterForm from './register-form.svelte';
export let show = false;
export let register = false;

$: onHide(show);

function onHide(visible: boolean) {
    if (!visible) {
        register = false;
    }
}
</script>

<Modal bind:show>
	<svelte:fragment slot="heading">
		{#if register}
			<h3 class="font-bold text-3xl">Register</h3>
			<p>Please register an account.</p>
		{:else}
			<h3 class="font-bold text-3xl">Sign In</h3>
			<p>Please sign in to your account.</p>
		{/if}
	</svelte:fragment>

	{#if register}
		<RegisterForm on:registered="{() => show = false}" on:login="{() => (register = false)}" />
	{:else}
		<LoginForm on:signedIn="{() => show = false}" on:register="{() => (register = true)}" />
	{/if}
</Modal>
