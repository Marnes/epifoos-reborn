<script lang="ts">
import { createEventDispatcher } from 'svelte';
import { session } from '$app/stores';

import Fa from 'svelte-fa';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const dispatch = createEventDispatcher();
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost normal-case text-xl">EPI-Foos Reborn</a>
	</div>
	<div class="flex-none gap-2">
		<div class="dropdown dropdown-end">
			<div tabindex="0" class="btn btn-ghost btn-circle avatar">
				<div class="w-10 rounded-full">
					{#if $session.user}
						<img src="https://api.lorem.space/image/face?hash=33791" alt="Avatar" />
					{:else}
						<Fa icon="{faUser}" size="2x" translateX="{0.25}" translateY="{0.15}" />
					{/if}
				</div>
			</div>
			<ul
				tabindex="0"
				class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
			>
				{#if $session.user}
					<li><button on:click="{() => dispatch('logout')}">Logout</button></li>
				{:else}
					<li><button on:click="{() => dispatch('showSession')}">Login / Register</button></li>
				{/if}
			</ul>
		</div>
	</div>
</div>
