import axios from 'axios';
import { useQuery } from 'react-query';
import { userServer } from '../../utils/Constants';

const getSpotList = async () => {
	return axios
		.get(`${userServer}/spots`)
		.then(response => {
			return response.data;
		})
		.catch(err => {
			console.log(err);
		});
};

export const useSpotList = () => {
	return useQuery('spots', getSpotList);
};
