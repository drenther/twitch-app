export const fetchUsers = () => {
	const defaultUsers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "comster404", "clickerheroesbot"];
	if (window.localStorage) {
		const cachedUsers = localStorage.getItem('twitch-users');
		if (cachedUsers) {
			return cachedUsers.split(',');
		} else {
			localStorage.setItem('twitch-users', defaultUsers);
			return defaultUsers;
		}
	} else {
		return defaultUsers;
	}
};

export const addNewUser = (newUser, users) => {
	if (users.includes(newUser)) return users;
	const updatedUsers = [...users, newUser];
	if (window.localStorage) {
		localStorage.setItem('twitch-users', updatedUsers);
	}
	return updatedUsers;
};

export const removeUser = (user, users) => {
	const updatedUsers = users.filter(u => u !== user);
	if (window.localStorage) {
		localStorage.setItem('twitch-users', updatedUsers);
	}
	return updatedUsers;
};

export const fetchChannelData = (name) => {
	const channel = fetch(`https://cors-anywhere.herokuapp.com/https://wind-bow.gomix.me/twitch-api/channels/${name}`)
		.then(res => res.json())
		.then(json => {
			return {
				error: json.error,
				displayName: json.display_name,
				logo: json.logo,
				status: json.status,
				url: json.url
			};
		});

	return channel;
};

export const fetchStreamData = (name) => {
	const stream = fetch(`https://cors-anywhere.herokuapp.com/https://wind-bow.gomix.me/twitch-api/streams/${name}`)
		.then(res => res.json())
		.then(json => {
			return [name, json.stream];
		});

	return stream;
};

export const filterUsers = (usersStream, route) => {
	const users = Object.keys(usersStream);
	switch (route) {
		case "/online":
			return users.filter(user => usersStream[user].stream);
		case "/offline":
			return users.filter(user => !usersStream[user].stream);
		default:
			return users;
	}
};