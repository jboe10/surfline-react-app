import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
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
		}).then(response => {
			return response.data;
		});
	}
}

export const useUpdateUserSpots = () => {
	const queryClient = useQueryClient();
	return useMutation(
		vars => {
			return updateUserSpots(vars);
		},
		{
			onSuccess: (data, variables, context) => {
				// TODO: refresh user spots list
				// TODO: Backend needs to send back full list of spots in response to PUT
				// then we can update with this code
				// queryClient.setQueryData('userInfo', data);
			},
			onError: (error, variables, context) => {
				console.log('Failed to Update User Spots: ', error);
				alert('Update to Favorite Spots Failed');
			},
		}
	);
};
