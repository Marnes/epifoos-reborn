<script lang="ts">
import _ from 'lodash';
export let label: string = null;
export let placeholder: string = null;
export let value: string = '';
export let type: string = 'text';
export let error: string = null;

$: uniqueId = _.uniqueId('text-field_');

const handleInput = (e) => {
	value = type.match(/^(number|range)$/) ? +e.target.value : e.target.value;
};
</script>

<div class="w-full">
	{#if label}
		<label for="{uniqueId}" class="text-sm font-medium label-text {error ? 'text-error' : ''}"
			>{label}</label
		>
	{/if}
	<input
		id="{uniqueId}"
		class="input input-bordered w-full {$$props.class} {error ? 'input-error text-error' : ''}"
		placeholder="{placeholder}"
		type="{type}"
		value="{value}"
		on:input="{handleInput}"
	/>
	{#if error}
		<label for="{uniqueId}" class="label pl-0 pt-1">
			<span class="label-text-alt font-medium text-error">{error}</span>
		</label>
	{/if}
</div>
