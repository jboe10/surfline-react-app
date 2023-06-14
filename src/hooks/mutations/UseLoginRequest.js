import axios from 'axios';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { backEndUrl } from '../../utils/Constants';

const loginServer = `${backEndUrl}/api/user`;

const LoginRequest = (email, password) => {
	return axios.post(`${loginServer}/login`, {
		email,
		password,
	});
};

export const UseLoginRequest = () => {
	const history = useHistory();
	return useMutation(
		vars => {
			return LoginRequest(vars.login, vars.password);
		},
		{
			onSuccess: (data, variables, context) => {
				// set token and go to home page
				localStorage.setItem('authorization', data.data.token);
				history.push('/');
			},
			onError: (error, variables, context) => {
				// An error happened!
				console.log('happened during login attempt: ', error);
				alert('Invalid Username or Password');
			},
		}
	);
};
