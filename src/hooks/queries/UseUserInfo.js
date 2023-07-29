import axios from 'axios';
import { useQuery } from 'react-query';
import { userServer } from '../../utils/Constants';

const getUserInfo = async () => {
	const token = localStorage.getItem('authorization');
	if (token) {
		return axios({
			method: 'GET',
			url: `${userServer}/user`,
			headers: { authorization: `Bearer ${token}` },
		}).then(response => {
			return response.data;
		});
	} else {
		return [];
	}
};

export const useUserInfo = () => {
	return useQuery({
		queryKey: 'userInfo',
		queryFn: getUserInfo,
		onError: error => {
			console.log('Error while getting user Info: ', error);
			if (error.response.status === 400) {
				localStorage.setItem('authorization', '');
				alert('Authentication expired, please re-enter your login info');
			}
		},
	});
};
