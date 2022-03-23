<script lang="ts">
import TextField from '$components/form/text-field.svelte';
import { post } from '$lib/utils';
import { createEventDispatcher } from 'svelte';
import _ from 'lodash';

const dispatch = createEventDispatcher();

let username = '';
let password = '';
let passwordConfirm = '';
let email = '';

$: passwordConfirmError = confirmPasswords(password, passwordConfirm) ? null : 'Passwords does not match';
$: validPasswordError = hasValidPassword(password, passwordConfirm) ? null : 'Passwords is not valid';

function confirmPasswords(password: string, passwordConfirm: string): boolean {
    return _.isEmpty(password) || _.isEmpty(passwordConfirm) || _.isEqual(password, passwordConfirm);

}
function hasValidPassword(password: string, passwordConfirm: string): boolean {
    return true;
}

async function register() {
	const response = await post(`auth/register`, { username, password, email });
}
</script>

<div class="space-y-5">
	<div class="space-y-2">
		<TextField
			class="bg-white"
			label="Username"
			placeholder="Enter your username"
			bind:value="{username}"
		/>
	</div>
	<div class="space-y-2">
		<TextField
			class="bg-white"
			label="Email"
			placeholder="Enter your email"
			bind:value="{email}"
		/>
	</div>
	<div class="space-y-2">
		<TextField
			class="bg-white"
			label="Password"
			type="password"
			placeholder="Enter your password"
            error="{passwordConfirmError || validPasswordError}"
			bind:value="{password}"
		/>
	</div>
	<div class="space-y-2">
		<TextField
			class="bg-white"
			label="Confirm Password"
			type="password"
			placeholder="Re-enter your password"
            error="{passwordConfirmError}"
			bind:value="{passwordConfirm}"
		/>
	</div>
	<div class="flex items-center justify-between">
		<div class="text-sm">
			Already have an account?
			<button on:click="{() => dispatch('login')}" class="text-primary hover:text-base-300 btn-link">
				Login here
            </button>
		</div>
	</div>
	<!-- <div class="flex items-center justify-between">
            <div class="flex items-center">
                <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    class="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                />
                <label for="remember_me" class="ml-2 block text-sm text-gray-800">Remember me</label>
            </div>
            <div class="text-sm">
                <a href="#" class="text-green-400 hover:text-green-500">Forgot your password?</a>
            </div>
        </div> -->
	<div>
		<button
			type="submit"
			class="w-full flex justify-center bg-secondary p-3 rounded-full font-semibold shadow-lg cursor-pointer transition ease-in duration-200 hover:bg-accent"
		>
			Register
		</button>
	</div>
</div>
