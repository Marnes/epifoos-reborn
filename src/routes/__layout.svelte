<script>
import '$lib/app.css';
import Topbar from '$components/layout/topbar.svelte';
import SessionModal from '$components/session/session-modal.svelte';
import { del } from '$lib/utils';
import { session } from '$app/stores';

let showSessionModal = false;

async function logout() {
	await del(`auth/logout`);
	// this will trigger a redirect, because it
	// causes the `load` function to run again
	$session.user = null;
}
</script>

<Topbar on:logout="{logout}" on:showSession="{() => (showSessionModal = true)}" />

<div class="from-primary via-base-100 to-secondary-100 bg-gradient-to-br">
	<div class="flex flex-col items-center h-screen">
		<div class="container">
			<slot />
		</div>
	</div>
</div>

<SessionModal bind:show="{showSessionModal}" />
