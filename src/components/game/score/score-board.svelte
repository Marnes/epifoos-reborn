<script lang="ts">
import type { Match } from '$models/match';
import GameBoard from '$components/game/score/game-board.svelte';

export let match: Match;
export let maxScore: number;
</script>

<div class="flex flex-col">
	{#each match.games as game}
		<GameBoard bind:game maxScore="{maxScore}" />
	{/each}
</div>
