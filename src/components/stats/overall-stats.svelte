<script lang="ts">
import type { Player } from '$models/player';
import { session } from '$app/stores';
import _ from 'lodash';

export let players: Player[];

$: sortedPlayers = _.sortBy(players, 'rank');

function getCellClass(player: Player) {
 return $session.user?.username === player.name ? 'bg-accent' : ''
}
</script>

<table class="table table-compact w-full rounded-none text-center">
	<thead>
		<tr>
			<th></th>
			<th>Player</th>
			<th>#</th>
			<th>W</th>
			<th>L</th>
			<th colspan="2">Elo</th>
		</tr>
	</thead>
	<tbody>
		{#each sortedPlayers as player}
			<tr>
				<td class="{getCellClass(player)}">{player.rank}</td>
				<td class="{getCellClass(player)}">{player.name}</td>
				<td class="{getCellClass(player)}">{player.games}</td>
				<td class="{getCellClass(player)}">{player.wins}</td>
				<td class="{getCellClass(player)}">{player.losses}</td>
				<td class="{getCellClass(player)}">{player.elo}</td>
				<td class="{getCellClass(player)}">
					{#if player.eloChange > 0}
						<span class="text-green-400">+{player.eloChange}</span>
					{:else}
						<span class="text-red-600">{player.eloChange}</span>
					{/if}
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style lang="scss">
</style>
