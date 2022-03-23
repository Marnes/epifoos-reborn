import { Player } from '$models/player';
import _ from 'lodash';

export async function get(): Promise<{}> {
	// const body = await api.post('users/login', {
	// 	user: {
	// 		username: user.username,
	// 		password: user.password
	// 	}
	// });

	const players = [
		createPlayer('Marnes'),
		createPlayer('Charl'),
		createPlayer('Arno'),
		createPlayer('Pierre'),
		createPlayer('Jaco'),
		createPlayer('Anrich'),
		createPlayer('Hardu'),
		createPlayer('Kevin'),
		createPlayer('Latham'),
		createPlayer('John'),
		createPlayer('Channel'),
		createPlayer('Chris'),
		createPlayer('IT'),
		createPlayer('Freddie')
	];

	return {
		body: rankPlayers(players)
	};
}

function createPlayer(username) {
	const player = new Player();
	player.name = username;
	player.elo = _.random(800, 1200);
	player.eloChange = _.random(-30, 30);
	player.games = _.random(50, 200);
	player.wins = _.random(20, 50);
	player.losses = _.random(20, 50);
	return player;
}

function rankPlayers(players: Player[]): Player[] {
	return _.sortBy(players, (player) => -player.elo).map((player, i) => {
		player.rank = i+1;
		return player;
	});
}
