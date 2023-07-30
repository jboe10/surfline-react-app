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
	});
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});

	it('should start as sing in button, sign out should not exist', () => {
		cy.get('#home-page-sign-in').should('exist');
		cy.get('#home-page-logout').should('not.exist');
	});
	it('should direct to sign in page', () => {
		cy.get('#home-page-sign-in').click();
		cy.url().should('eq', 'http://localhost:3000/login');
	});
	it('should change to logout button(no longer sign in) after sign in and have redirected to home page', () => {
		// go to login page
		cy.visit('http://localhost:3000/login');

		// log in
		cy.get('#login-email').type(email);
		cy.get('#login-password').type(password);
		cy.get('#login-btn').click();

		// should have redirected
		cy.url().should('eq', 'http://localhost:3000/');

		// should be login
		cy.get('#home-page-sign-in').should('not.exist');
		cy.get('#home-page-logout').should('exist');
	});

	it('should persist through visits to other pages', () => {
		// go to login page
		cy.visit('http://localhost:3000/login');
		cy.intercept('POST', '**/api/user/login').as('loginAttempt');

		// log in
		cy.get('#login-email').type(email);
		cy.get('#login-password').type(password);
		cy.get('#login-btn').click();

		// login sucess
		cy.wait('@loginAttempt').then(({ request, response }) => {
			expect(response.statusCode).to.equal(200);
		});

		// // visit other pages
		cy.visit('http://localhost:3000/signup');
		cy.visit('http://localhost:3000/');

		// should be login
		cy.get('#home-page-sign-in').should('not.exist');
		cy.get('#home-page-logout').should('exist');
	});

	it('clicking logout removes auth from local storage and sets button to sign in', () => {
		// go to login page
		cy.visit('http://localhost:3000/login');
		cy.intercept('POST', '**/api/user/login').as('loginAttempt');

		// log in
		cy.get('#login-email').type(email);
		cy.get('#login-password').type(password);
		cy.get('#login-btn').click();

		// login sucess
		cy.wait('@loginAttempt').then(({ request, response }) => {
			expect(response.statusCode).to.equal(200);
		});

		// click logout
		cy.get('#home-page-sign-in').should('not.exist');
		cy.get('#home-page-logout').should('exist');
		cy.get('#home-page-logout').click();

		// should now be sigin in button and not sign out
		cy.get('#home-page-sign-in').should('exist');
		cy.get('#home-page-logout').should('not.exist');

		// local storage should not longer have auth
		cy.getAllLocalStorage().then(response => {
			expect(response['http://localhost:3000'].authorization).to.equal('');
		});
	});
});
