import type { Player } from './player';
import _ from 'lodash';

export class Game {
	leftPlayer1: Player;
	leftPlayer2: Player;
	rightPlayer1: Player;
	rightPlayer2: Player;

	leftScore1: number;
	leftScore2: number;
	rightScore1: number;
	rightScore2: number;

	private constructor(
		leftPlayer1: Player,
		leftPlayer2: Player,
		rightPlayer1: Player,
		rightPlayer2: Player
	) {
		this.leftPlayer1 = leftPlayer1;
		this.leftPlayer2 = leftPlayer2;
		this.rightPlayer1 = rightPlayer1;
		this.rightPlayer2 = rightPlayer2;
	}

	static create(
		leftPlayer1: Player,
		leftPlayer2: Player,
		rightPlayer1: Player,
		rightPlayer2: Player
	): Game {
		return new Game(leftPlayer1, leftPlayer2, rightPlayer1, rightPlayer2);
	}

	canSubmit(): boolean {
		return (
			!_.isNil(this.leftPlayer1) &&
			!_.isNil(this.leftPlayer2) &&
			!_.isNil(this.rightPlayer1) &&
			!_.isNil(this.rightPlayer2) &&
			!_.isNil(this.leftScore1) &&
			!_.isNil(this.leftScore2) &&
			!_.isNil(this.rightScore1) &&
			!_.isNil(this.rightScore2)
		);
	}
}
