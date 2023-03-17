import axios from 'axios';
import { useQuery } from 'react-query';
import { userServer } from '../../utils/Constants';

const getUserInfo = async () => {
	const token = localStorage.getItem('auth-token');
	if (token) {
		return axios({
			method: 'GET',
			url: `${userServer}/user`,
			headers: { 'auth-token': token },
		})
			.then(response => {
				return response.data;
			})
			.catch(err => {
				console.log(err);
			});
	} else {
		return [];
	}
};

export const useUserInfo = () => {
	return useQuery('userInfo', getUserInfo);
};
