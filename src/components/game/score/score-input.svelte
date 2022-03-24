<script lang="ts">
import { createEventDispatcher } from 'svelte';

export let maxScore: number;
export let value: number = undefined;
export let reverse = false;

const dispatch = createEventDispatcher();

$: scoreArray = getScoreArray();

function onSelect(score) {
	return () => {
		value = score;
		dispatch('input', value);
	};
}

function getScoreArray() {
	if (reverse) {
		return [...Array(maxScore + 1).keys()].reverse();
	}

	return [...Array(maxScore + 1).keys()];
}
</script>

<div class="stats shadow h-16 rounded-none">
	{#each scoreArray as i}
		<div
			class="stat stat-{i}"
			class:shadow-2xl="{i === value}"
			class:shadow-black="{i === value}"
			class:selected="{i === value}"
			on:click="{onSelect(i)}"
		>
			<div class="stat-value">{i}</div>
		</div>
	{/each}
</div>

<style lang="scss">
.stat {
	opacity: 0.2;
	padding-top: 0.8rem;
	cursor: pointer;
	overflow-y: hidden;

	&.selected {
		opacity: 1;
		transition: opacity 0.5s;
	}
}

.stat-0 {
	&.selected {
		background-color: #ff3e00;
		color: white;
	}
}

.stat-1 {
	&.selected {
		background-color: #e64749;
		color: white;
	}
}

.stat-2 {
	&.selected {
		background-color: #f2a950;
		color: white;
	}
}

.stat-3 {
	&.selected {
		background-color: #e5c269;
		color: white;
	}
}

.stat-4 {
	&.selected {
		background-color: #7bb173;
		color: white;
	}
}

.stat-5 {
	&.selected {
		background-color: #24443b;
		color: white;
	}
}
</style>
