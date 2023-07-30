/// <reference types="cypress" />
const email = '123456789@gmail.com';
const password = '123456789';
describe('LoginPage', () => {
	before(() => {
		cy.visit('http://localhost:3000/join');
		cy.get('#sign-up-name').type('Jonny Walls');
		cy.get('#sign-up-email').type(email);
		cy.get('#sign-up-password').type(password);
		cy.get('#sign-up-password-re-enter').type(password);
		cy.get('#sign-up-btn').click();
		cy.visit('http://localhost:3000/login');
	});
	it('login with valid email and save token in local storage, then sent to home page', () => {
		// intercept login attempt
		cy.intercept('POST', '**/api/user/login').as('loginAttempt');

		// logged in
		cy.get('#login-email').type(email);
		cy.get('#login-password').type(password);
		cy.get('#login-btn').click();

		// look at login attempt and see if === 200
		let auth = '';
		cy.wait('@loginAttempt').then(({ request, response }) => {
			expect(response.statusCode).to.equal(200);
			auth = response.body.token;
		});

		// also see if we saved auth header to local storage
		cy.getAllLocalStorage().then(response => {
			console.log(response);
			expect(auth).to.equal(response['http://localhost:3000'].authorization);
		});

		cy.url().should('eq', 'http://localhost:3000/');
	});

	it('Attempt login with invalid creds', () => {
		// intercept login attempt
		cy.intercept('POST', '**/api/user/login').as('loginAttempt');

		// make login attempt with invalid creds
		cy.visit('http://localhost:3000/login');
		cy.get('#login-email').type(email);
		cy.get('#login-password').type(password + 'invalid');
		cy.get('#login-btn').click();
		cy.wait('@loginAttempt').then(({ request, response }) => {
			expect(response.statusCode).to.equal(400);
			auth = response.body.token;
		});
		cy.url().should('eq', 'http://localhost:3000/login');
	});
});
