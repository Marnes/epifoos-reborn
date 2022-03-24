<script lang="ts">
import _ from 'lodash';
import Flip from '$components/layout/flip.svelte';

import PlayerInput from '$components/game/player/player-input.svelte';

import type { Player } from '$models/player';
import { session } from '$app/stores';

export let players: Player[];
export let selectedPlayers: Player[] = [];

$: currentPlayer = players.find((player) => player.name === $session?.user?.username);
$: remainingPlayers = players.filter((player) => player.name !== currentPlayer?.name);

function selectPlayer(player: Player) {
	if (selectedPlayers.length < 4) {
		selectedPlayers = [...selectedPlayers, player];
	}
}

function deselectPlayer(player: Player) {
	selectedPlayers = _.without(selectedPlayers, player);
}
</script>

<div class="player-board grid grid-cols-3 gap-1">
	{#if currentPlayer}
		<Flip
			vertical
			duration="{300}"
			class="h-16"
			flipped="{selectedPlayers.some((p) => p === currentPlayer)}"
		>
			<PlayerInput
				primary
				slot="front"
				player="{currentPlayer}"
				hasSelected="{selectedPlayers.length > 0}"
				on:click="{() => selectPlayer(currentPlayer)}"
			/>
			<PlayerInput
				primary
				selected
				slot="back"
				player="{currentPlayer}"
				on:click="{() => deselectPlayer(currentPlayer)}"
			/>
		</Flip>
	{/if}
	{#each remainingPlayers as player}
		<Flip
			vertical
			duration="{300}"
			class="h-16"
			flipped="{selectedPlayers.some((p) => p === player)}"
		>
			<PlayerInput
				slot="front"
				player="{player}"
				hasSelected="{selectedPlayers.length > 0}"
				on:click="{() => selectPlayer(player)}"
			/>
			<PlayerInput
				selected
				slot="back"
				player="{player}"
				on:click="{() => deselectPlayer(player)}"
			/>
		</Flip>
	{/each}
</div>

<style lang="scss">
.player-board :global(.player) {
	cursor: pointer;
}
</style>
