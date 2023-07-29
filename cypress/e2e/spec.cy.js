/* eslint-disable no-undef */
describe('Registers account', () => {
	it('test Inputs', () => {
		cy.visit('http://localhost:3000/join');
		cy.get('#sign-up-name')
			.type('Jonny Walls')
			.should('have.value', 'Jonny Walls');
		cy.get('#sign-up-email')
			.type('jonnyWalls@gmail.com')
			.should('have.value', 'jonnyWalls@gmail.com');
		cy.get('#sign-up-password').type('123123').should('have.value', '123123');
		cy.get('#sign-up-password-re-enter')
			.type('123123')
			.should('have.value', '123123');
	});
});
