<script lang="ts">
import type { Match } from '$models/match';
import GameBoard from '$components/game/score/game-board.svelte';
import type { Player } from '$models/player';

export let match: Match;
export let maxScore: number;
export let winner: Player = null;
export let loser: Player = null;
</script>

<div class="flex flex-col">
	{#each match.games as game}
		<GameBoard bind:game maxScore="{maxScore}" winner="{winner}" loser="{loser}" />
	{/each}
</div>
