<script lang="ts">
import { createEventDispatcher } from 'svelte';
import type { Player } from '$models/player';

export let player: Player;
export let selected = false;
export let primary = false;

const dispatch = createEventDispatcher();

function onSelect(player: Player) {
	return () => {
		dispatch('click', player);
	};
}
</script>

<div
	class="player flex flex-row h-16 items-center rounded-none pl-1
	{selected ? 'selected' : ''} {primary ? 'bg-accent' : 'bg-secondary'} {$$props.class}"
	on:click="{onSelect(player)}"
>
	<div class="flex">
		<div class="avatar">
			<div class="w-14 mr-3">
				<img src="https://api.lorem.space/image/face?hash=80245" alt="Player Avatar" />
			</div>
		</div>
	</div>
	<div class="flex flex-col grow">
		<div class="flex">
			<div>
				<h1 class="text-xl font-extrabold">{player.name}</h1>
			</div>
		</div>
		<div class="flex justify-between">
			<span class="text-base-content/70 text-sm">{player.elo}</span>
		</div>
	</div>
</div>
	{/if}
</div>
