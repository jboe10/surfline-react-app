import axios from 'axios';
import { useQuery } from 'react-query';
import { userServer } from '../../utils/Constants';

const getSpotList = async () => {
	return axios.get(`${userServer}/spots`).then(response => {
		return response.data;
	});
};

export const useSpotList = () => {
	return useQuery({
		queryKey: 'spots',
		queryFn: getSpotList,
		onError: error => {
			console.log('Error while getting spot list: ', error);
		},
	});
};
