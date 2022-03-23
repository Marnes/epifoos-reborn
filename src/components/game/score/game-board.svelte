<script lang="ts">
import ScoreSelector from '$components/game/score/score-input.svelte';
import { MatchSettings } from '$models/constants';
import type { Game } from '$models/game';
import PlayerInput from '../player/player-input.svelte';

export let game: Game;
export let maxScore: number = MatchSettings.MAX_SCORE;

function updateScore(game: Game, left: boolean, first: boolean) {
	return ({ detail }) => {
		setScore(game, detail, left, first);
		setScore(game, detail === maxScore ? null : maxScore, !left, first);
	};
}

function setScore(game: Game, score: number, left: boolean, first: boolean) {
	if (left) {
		if (first) {
			game.leftScore1 = score;
		} else {
			game.leftScore2 = score;
		}
	} else {
		if (first) {
			game.rightScore1 = score;
		} else {
			game.rightScore2 = score;
		}
	}
}
</script>

<div class="my-6">
	<!-- <div class="text-center font-bold mb-5 text-xl"><span>Game {gameNumber}</span></div> -->
	<div class="flex items-center justify-center">
		<div class="flex flex-col gap-2">
			<PlayerInput player={game.leftPlayer1} class="w-52"/>
			<PlayerInput player={game.leftPlayer2} class="w-52"/>
		</div>
		<div class="flex flex-col gap-2">
			<ScoreSelector
				maxScore="{maxScore}"
				bind:value="{game.leftScore1}"
				on:input="{updateScore(game, true, true)}"
			/>
			<ScoreSelector
				maxScore="{maxScore}"
				bind:value="{game.leftScore2}"
				on:input="{updateScore(game, true, false)}"
			/>
		</div>
		<div class="flex flex-col mx-5 font-bold">VS</div>
		<div class="flex flex-col gap-2">
			<ScoreSelector
				reverse
				maxScore="{maxScore}"
				bind:value="{game.rightScore1}"
				on:input="{updateScore(game, false, true)}"
			/>
			<ScoreSelector
				reverse
				maxScore="{maxScore}"
				bind:value="{game.rightScore2}"
				on:input="{updateScore(game, false, false)}"
			/>
		</div>
		<div class="flex flex-col gap-2">
			<PlayerInput player={game.rightPlayer1} class="w-52"/>
			<PlayerInput player={game.rightPlayer2} class="w-52"/>
		</div>
	</div>
</div>
