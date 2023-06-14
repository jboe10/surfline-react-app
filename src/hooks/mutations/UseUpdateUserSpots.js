import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { backEndUrl } from '../../utils/Constants';
const userServer = `${backEndUrl}/api`;

export function updateUserSpots(favSpots) {
	const token = localStorage.getItem('authorization');
	if (token) {
		return axios({
			method: 'PUT',
			url: `${userServer}/user`,
			data: { favoriteSpots: favSpots },
			headers: { authorization: `Bearer ${token}` },
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
				// update all Favorite spots data around site
				queryClient.setQueryData('userInfo', data);
			},
			onError: (error, variables, context) => {
				console.log('Failed to Update User Spots: ', error);
				alert('Update to Favorite Spots Failed');
			},
		}
	);
};
