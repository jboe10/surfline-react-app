import axios from 'axios';
import { useQuery } from 'react-query';
import { userServer } from '../../utils/Constants';

function getUserInfo() {
	const token = localStorage.getItem('auth-token');
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
}

export const useUserInfo = () => {
	return useQuery('userInfo', getUserInfo);
};
