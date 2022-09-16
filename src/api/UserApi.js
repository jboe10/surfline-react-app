import axios from 'axios';
const userServer = `http://18.144.173.200:4000/api`;

export function getUserInfo() {
	const token = localStorage.getItem('auth-token');
	return axios({
		method: 'GET',
		url: `${userServer}/user`,
		headers: { 'auth-token': token },
	}).then(response => {
		return response.data;
	});
}

export function updateUserSpots(favSpots) {
	const token = localStorage.getItem('auth-token');
	if (token) {
		return axios({
			method: 'PUT',
			url: `${userServer}/user`,
			data: { favoriteSpots: favSpots },
			headers: { 'auth-token': token },
		}).then(response => {
			return response.data;
		});
	}
}

export function getSpotList() {
	return axios.get(`${userServer}/spots`).then(response => {
		return response.data;
	});
}
