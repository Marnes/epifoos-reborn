<script lang="ts">
export let heading: string = null;
export let show = false;

$: hasHeading = () => heading || $$slots.heading;
</script>

<div class="modal {show ? 'modal-open' : ''}">
	<div class="modal-box relative">
		<label
			for="my-modal-3"
			class="btn btn-sm btn-circle absolute right-2 top-2 bg-secondary hover:bg-secondary-focus border-secondary-focus"
			on:click="{() => (show = false)}">✕</label
		>
		<slot name="heading">
			{#if heading}
				<h3 class="font-bold text-lg">{heading}</h3>
			{/if}
		</slot>
		<div class="w-full {hasHeading ? 'mt-5' : ''}">
			<slot />
		</div>
	</div>
</div>
