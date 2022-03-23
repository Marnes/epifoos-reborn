<script context="module">
export async function load({ fetch }) {
	const players = await fetch(`/players.json`).then((r) => r.json());
	
	return {
		props: { players }
	};
}
</script>

<script lang="ts">
import PlayerBoard from '$components/game/player/player-board.svelte';
import ScoreBoard from '$components/game/score/score-board.svelte';
import GlassPanel from '$components/layout/glass-panel.svelte';
import OverallStats from '$components/stats/overall-stats.svelte';

import { MatchSettings } from '$models/constants';
import { Match } from '$models/match';
import type { Player } from '$models/player';

export let players: Player[];

let match: Match;
let gameStarted = false;
let selectedPlayers: Player[] = [];


$: canStart = selectedPlayers.length === 4;
$: hasValidScore = match && match.canSubmit();

function startGame() {
	if (selectedPlayers.length !== 4) {
		return;
	}

	match = Match.create(selectedPlayers);
	gameStarted = true;
}

function submitScores() {}
</script>

{#if gameStarted}
	<GlassPanel class="w-full mt-5">
		<ScoreBoard bind:match maxScore="{MatchSettings.MAX_SCORE}" />
	</GlassPanel>

	<div class="mt-2 w-full">
		<button
			disabled="{!hasValidScore}"
			class="btn btn-primary btn-block rounded-none"
			on:click="{submitScores}"
		>
			Submit
		</button>
	</div>
{:else}
	<GlassPanel class="w-full mt-5">
		<div class="grid grid-cols-3">
			<div class="col-span-2">
				<PlayerBoard players="{players}" bind:selectedPlayers />
			</div>
			<div>
				<OverallStats players="{players}" />
			</div>
		</div>
	</GlassPanel>

	<div class="mt-2 w-full">
		<button
			disabled="{!canStart}"
			class="btn btn-primary btn-block rounded-none"
			on:click="{startGame}"
		>
			Start Game
		</button>
	</div>
{/if}
