import api from '$lib/api';

export async function post({ request }): Promise<{}> {
	const user = await request.json();

	// const body = await api.post('users/login', {
	// 	user: {
	// 		username: user.username,
	// 		password: user.password
	// 	}
	// });

	const body = {
		user: { username: user.username },
		errors: null
	};

	if (body.errors) {
		return { status: 401, body };
	}

    const json = JSON.stringify(body.user);
	const value = Buffer.from(json).toString('base64');

	return {
		headers: {
			'set-cookie': `jwt=${value}; Path=/; HttpOnly`
		},
		body
	};
}
