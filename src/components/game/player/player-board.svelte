<script lang="ts">
import _ from 'lodash';
import PlayerInput from '$components/game/player/player-input.svelte';

import type { Player } from '$models/player';
import { session } from '$app/stores';

export let players: Player[];
export let selectedPlayers: Player[] = [];

$: currentPlayer = players.find((player) => player.name === $session?.user?.username);
$: remainingPlayers = players.filter((player) => player.name !== currentPlayer?.name);

function onClick(player: Player) {
	return () => {
		if (_.includes(selectedPlayers, player)) {
			selectedPlayers = _.without(selectedPlayers, player);
		} else if (selectedPlayers.length < 4) {
			selectedPlayers = [...selectedPlayers, player];
		}
	};
}
</script>

<div class="player-board grid grid-cols-3 gap-1">
	{#if currentPlayer}
		<PlayerInput
			primary
			player="{currentPlayer}"
			selected="{selectedPlayers.some((p) => p === currentPlayer)}"
			on:click="{onClick(currentPlayer)}"
		/>
	{/if}

	{#each remainingPlayers as player}
		<PlayerInput
			player="{player}"
			selected="{selectedPlayers.some((p) => p === player)}"
			on:click="{onClick(player)}"
		/>
	{/each}
</div>

<style lang="scss">
.player-board :global(.player) {
	cursor: pointer;
}
</style>
