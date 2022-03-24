<script lang="ts">
import TextField from '$components/form/text-field.svelte';
import { session } from '$app/stores';
import { post } from '$lib/utils';
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

let username = '';
let password = '';

async function login() {
	const response = await post(`auth/login`, { username, password });

	if (response.user) {
		$session.user = response.user;
		dispatch('signedIn');
	}
}
</script>

<div class="space-y-5">
	<div class="space-y-2">
		<TextField
			autofocus="{true}"
			class="bg-white"
			label="Username"
			placeholder="Enter your username"
			bind:value="{username}"
		/>
	</div>
	<div class="space-y-2">
		<TextField
			class="bg-white"
			label="Password"
			type="password"
			placeholder="Enter your password"
			bind:value="{password}"
		/>
	</div>
	<div class="flex items-center justify-between">
		<div class="text-sm">
			Don't have an account?
			<button
				on:click="{() => dispatch('register')}"
				class="text-primary hover:text-base-300 btn-link"
			>
				Register here
			</button>
		</div>
	</div>
	<div>
		<button
			type="submit"
			class="w-full text-white flex justify-center bg-primary p-3 rounded-full font-semibold shadow-lg cursor-pointer transition ease-in duration-200 hover:bg-primary-focus"
			on:click="{login}"
		>
			Sign in
		</button>
	</div>
</div>
