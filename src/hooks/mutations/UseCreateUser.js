import axios from 'axios';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { backEndUrl } from '../../utils/Constants';

const loginServer = `${backEndUrl}/api/user`;

export function CreateUser(name, email, pass) {
	return axios
		.post(`${loginServer}/register`, {
			name: `${name}`,
			email: `${email}`,
			password: `${pass}`,
		})
		.then(response => {
			return response;
		})
		.catch(err => {
			return undefined;
		});
}

export const UseCreateUser = () => {
	const history = useHistory();
	return useMutation(
		vars => {
			return CreateUser(vars.name, vars.email, vars.password);
		},
		{
			onSuccess: (data, variables, context) => {
				history.push('/login');
			},
			onError: (error, variables, context) => {
				console.log(`${error}: on account create`);
				alert(error);
			},
		}
	);
};
