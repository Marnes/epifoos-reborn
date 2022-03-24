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
import Flip from '$components/layout/flip.svelte';
import GlassPanel from '$components/layout/glass-panel.svelte';
import OverallStats from '$components/stats/overall-stats.svelte';

import _ from 'lodash';

import { MatchSettings } from '$models/constants';
import { Match } from '$models/match';
import type { Player } from '$models/player';

export let players: Player[];

let match: Match;
let gameStarted = false;
let selectedPlayers: Player[] = [];

$: canStart = selectedPlayers.length === 4;
$: hasValidScore = match?.canSubmit();
$: winner = getWinner(match, selectedPlayers);
$: loser = getLoser(match, selectedPlayers);
$: submitString = getSubmitString(winner, loser);

function startGame() {
	if (selectedPlayers.length !== 4) {
		return;
	}

	match = Match.create(selectedPlayers);
	gameStarted = true;
}

function getWinner(match: Match, players: Player[]): Player {
	if (_.isNil(match) || _.isEmpty(players)) {
		return null;
	}

	const winners = selectedPlayers.filter((player) =>
		match.games.every((game) => game.isDraw() || game.isWinner(player))
	);

	if (winners.length !== 1) {
		return null;
	}

	return winners[0];
}

function getLoser(match: Match, players: Player[]): Player {
	if (_.isNil(match) || _.isEmpty(players)) {
		return null;
	}

	const losers = selectedPlayers.filter((player) =>
		match.games.every((game) => game.isDraw() || game.isLoser(player))
	);

	if (losers.length !== 1) {
		return null;
	}

	return losers[0];
}

function getSubmitString(winner: Player, loser: Player) {
	if (winner && loser) {
		return `Submit a win for ${winner.name} and a loss for ${loser.name}`;
	}

	if (winner) {
		return `Submit a win for ${winner.name}`;
	}

	if (loser) {
		return `Submit a loss for ${loser.name}`;
	}

	return `Submit with no winners or losers`;
}

function submitScores() {}
</script>

<Flip flipped="{gameStarted}" duration={1000}>
	<div slot="front">
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
				class="btn btn-neutral btn-block rounded-none"
				on:click="{startGame}"
			>
				Start Game
			</button>
		</div>
	</div>
	<div slot="back">
		<GlassPanel class="w-full mt-5">
			<ScoreBoard
				bind:match
				maxScore="{MatchSettings.MAX_SCORE}"
				winner="{winner}"
				loser="{loser}"
			/>
		</GlassPanel>

		<div class="mt-2 w-full">
			<button
				disabled="{!hasValidScore}"
				class="btn btn-block rounded-none"
				class:btn-warning="{winner && loser}"
				class:btn-success="{winner && !loser}"
				class:btn-error="{!winner && loser}"
				class:btn-neutral="{!winner && !loser}"
				on:click="{submitScores}"
			>
				{getSubmitString(winner, loser)}
			</button>
		</div>
	</div>
</Flip>
