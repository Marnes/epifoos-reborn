<script lang="ts">
import Fa from 'svelte-fa';
import { createEventDispatcher } from 'svelte';
import type { Player } from '$models/player';
import { faCrown, faFaceSadCry } from '@fortawesome/free-solid-svg-icons';

export let player: Player;
export let selected = false;
export let hasSelected = false;
export let primary = false;
export let winner = false;
export let loser = false;

const dispatch = createEventDispatcher();

function onSelect(player: Player) {
	return () => {
		dispatch('click', player);
	};
}
</script>

<div
	class="player flex flex-row h-16 items-center rounded-none border-4 {$$props.class}"
	class:selected
	class:bg-accent="{primary}"
	class:bg-primary="{!primary}"
	class:border-accent="{selected}"
	class:border-primary="{!selected}"
	class:faded="{hasSelected && !selected}"
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
			<span class="text-sm">{player.elo}</span>
		</div>
	</div>
</div>

<style lang="scss">
.player {
	opacity: 1;
	transition: opacity 0.5s;

	&.selected {
		background-image: url('$lib/assets/football.png');
		background-position: 95% center;
		background-size: 30%;
		background-repeat: no-repeat;
	}
}
.faded {
	opacity: 0.55;
	transition: opacity 0.5s;
}
</style>
