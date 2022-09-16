import axios from 'axios';
import { backEndUrl } from '../utils/Constants';

const loginServer = `${backEndUrl}/api/user`;

export default function LoginRequest(email, pass) {
	return axios
		.post(`${loginServer}/login`, {
			email: `${email}`,
			password: `${pass}`,
		})
		.then(response => {
			return response.data.token;
		});
}

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
