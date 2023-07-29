import React, { useState, useRef } from 'react';
import surfline from '../../imgs/surfline.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faEnvelopeOpenText,
	faNewspaper,
	faCompass,
} from '@fortawesome/free-solid-svg-icons';
import {
	nameLoginValidation,
	emailLoginValidation,
	passwordLoginValidation,
	passwordReEnterValidation,
} from '../../utils/Helpers';
import { UseCreateUser } from '../../hooks/mutations/UseCreateUser';

export default function LogInPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordReEnter, setPasswordReEnter] = useState('');
	const [name, setName] = useState('');

	const nameInput = useRef(null);
	const emailInput = useRef(null);
	const passwordInput = useRef(null);
	const passwordInputReEnter = useRef(null);

	const mutation = UseCreateUser();

	const formSubmit = async event => {
		event.preventDefault();
		const nameValid = nameLoginValidation(name);
		const emailValid = emailLoginValidation(email);
		const passwordValid = passwordLoginValidation(password);
		const passwordReEnterValid = passwordReEnterValidation(
			password,
			passwordReEnter
		);

		nameValid
			? (nameInput.current.className = 'border-gray')
			: (nameInput.current.className = 'border-red');

		emailValid
			? (emailInput.current.className = 'border-gray')
			: (emailInput.current.className = 'border-red');

		passwordValid
			? (passwordInput.current.className = 'border-gray')
			: (passwordInput.current.className = 'border-red');

		passwordReEnterValid
			? (passwordInputReEnter.current.className = 'border-gray')
			: (passwordInputReEnter.current.className = 'border-red');

		if (nameValid && emailValid && passwordValid && passwordReEnterValid) {
			mutation.mutate({ name, email, password });
		}
	};

	const nameInputChangeHandler = event => {
		setName(event.target.value);
	};

	const emailInputChangeHandler = event => {
		setEmail(event.target.value);
	};

	const passwordInputChangeHandler = event => {
		setPassword(event.target.value);
	};

	const passwordInputReEnterChangeHandler = event => {
		setPasswordReEnter(event.target.value);
	};
	return (
		<div className="sign-up-page">
			<div className="sign-up-form">
				<div className="header">
					<a href="/">
						<img width="50px" height="50px" src={surfline} alt="FF" />
					</a>
				</div>
				<div className="body-wrap">
					<div className="bodys">
						<h3>Sign Up!</h3>
						<div className="sign-up">
							Have have an account? <a href="/login">Sign In</a>
						</div>
						<form onSubmit={formSubmit}>
							<div className="login-input">
								<input
									className="border-gray"
									id="sign-up-name"
									type="text"
									onChange={nameInputChangeHandler}
									placeholder="FULL NAME"
									ref={nameInput}
								/>
							</div>
							<div className="register-info">(Min 6 Characters)</div>
							<div className="login-input email">
								<input
									className="border-gray"
									id="sign-up-email"
									type="text"
									onChange={emailInputChangeHandler}
									placeholder="EMAIL"
									ref={emailInput}
								/>
							</div>
							<div className="register-info">(Valid Email)</div>
							<div className="login-input">
								<input
									className="border-gray"
									type="password"
									id="sign-up-password"
									onChange={passwordInputChangeHandler}
									placeholder="PASSWORD"
									ref={passwordInput}
								/>
								{/* <FontAwesomeIcon icon={faEye} /> */}
							</div>
							<div className="register-info">(Min 6 Characters)</div>
							<div className="login-input">
								<input
									className="border-gray"
									type="password"
									id="sign-up-password-re-enter"
									onChange={passwordInputReEnterChangeHandler}
									placeholder="RE ENTER PASSWORD"
									ref={passwordInputReEnter}
								/>
								{/* <FontAwesomeIcon icon={faEye} /> */}
							</div>
							<div className="register-info">(Re-Enter Password)</div>
							<button type="submit" className="sign-in-btn" id="sign-up-btn">
								SIGN UP
							</button>
						</form>
					</div>
				</div>
			</div>

			<div className="benefits">
				<div className="benefit-wrap">
					<h2>Account Benefits</h2>

					<div className="blurb">
						<FontAwesomeIcon icon={faCompass} />
						<div className="blurb-text">
							<h4>Favorite Your Spots</h4>
							<p>Quickly access cams and forecasts for the </p>
							<p>breaks your care bost about</p>
						</div>
					</div>

					<div className="blurb">
						<FontAwesomeIcon icon={faEnvelopeOpenText} />
						<div className="blurb-text">
							<h4>Email Newsletter</h4>
							<p>The best of surfline delivered straight to your</p>
							<p>inbox.</p>
						</div>
					</div>

					<div className="blurb">
						<FontAwesomeIcon icon={faNewspaper} />
						<div className="blurb-text">
							<h4>Personalized Homepage</h4>
							<p>Recieve news and forecasts tailored to your</p>
							<p>local area.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
