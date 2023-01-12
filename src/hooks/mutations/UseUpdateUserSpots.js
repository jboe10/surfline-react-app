import axios from 'axios';
import { useMutation } from 'react-query';
import { backEndUrl } from '../../utils/Constants';
const userServer = `${backEndUrl}/api`;

export function updateUserSpots(favSpots) {
	const token = localStorage.getItem('auth-token');
	if (token) {
		return axios({
			method: 'PUT',
			url: `${userServer}/user`,
			data: { favoriteSpots: favSpots },
			headers: { 'auth-token': token },
		})
			.then(response => {
				return response.data;
			})
			.catch(err => {
				console.log(err);
			});
	}
}

export const useUpdateUserSpots = () => {
	return useMutation(vars => {
		return updateUserSpots(vars);
	}, {});
};
