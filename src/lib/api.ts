const base = 'http://localhost:8080/api';

async function send({ method, path, data = null, token = null }) {
	const opts = { method, headers: {}, body: null };

	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	if (token) {
		opts.headers['Authorization'] = `Token ${token}`;
	}

	return fetch(`${base}/${path}`, opts)
		.then((r) => r.text())
		.then((json) => {
			try {
				return JSON.parse(json);
			} catch (err) {
				return json;
			}
		});
}

export default {
	get(path, token) {
		return send({ method: 'GET', path, token });
	},
	del(path, token) {
		return send({ method: 'DELETE', path, token });
	},
	post(path, data, token = null) {
		return send({ method: 'POST', path, data, token });
	},
	put(path, data, token = null) {
		return send({ method: 'PUT', path, data, token });
	}
};
