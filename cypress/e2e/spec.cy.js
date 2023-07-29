describe('Registers account inputs', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/join');
	});
	it('verify all inputs are working', () => {
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

	it('invalid signup Name shows red border & does not submit form', () => {
		// Type nothing
		cy.get('#sign-up-btn').click();
		cy.get('#sign-up-name').should('have.class', 'border-red');

		// Type less than 6 chars
		cy.reload();
		cy.get('#sign-up-name').type('12345');
		cy.get('#sign-up-btn').click();
		cy.get('#sign-up-name').should('have.class', 'border-red');

		// Type 6 characters
		cy.reload();
		cy.get('#sign-up-name').type('123456');
		cy.get('#sign-up-btn').click();
		cy.get('#sign-up-name').should('have.class', 'border-gray');
	});

	it('invalid signup Email shows red border & does not submit form', () => {
		// Type nothing
		cy.get('#sign-up-btn').click();
		cy.get('#sign-up-name').should('have.class', 'border-red');

		// Type Something that isn't an email
		cy.reload();
		cy.get('#sign-up-email').type('jonnyWalls');
		cy.get('#sign-up-btn').click();
		cy.get('#sign-up-email').should('have.class', 'border-red');

		// Type Something that is a valid email
		cy.reload();
		cy.get('#sign-up-email').type('jonnyWalls@gmail.com');
		cy.get('#sign-up-btn').click();
		cy.get('#sign-up-email').should('have.class', 'border-gray');
	});

	// TODO: PASSWORD VALID/INVALID
	it('invalid signup Password shows red border & does not submit form', () => {
		// type Nothing
		cy.get('#sign-up-btn').click();
		cy.get('#sign-up-password').should('have.class', 'border-red');

		// Sub 6 character password
		cy.reload();
		cy.get('#sign-up-password').type('11');
		cy.get('#sign-up-btn').click();
		cy.get('#sign-up-password').should('have.class', 'border-red');

		// valid Password
		cy.reload();
		cy.get('#sign-up-password').type('123123');
		cy.get('#sign-up-btn').click();
		cy.get('#sign-up-password').should('have.class', 'border-gray');
	});

	it('invalid signup Password RETYPE shows red border & does not submit form', () => {
		// valid password , invalid retype
		cy.get('#sign-up-password').type('123123');
		cy.get('#sign-up-btn').click();
		cy.get('#sign-up-password-re-enter').should('have.class', 'border-red');

		// valid password, valid retype, but not match
		cy.reload();
		cy.get('#sign-up-password').type('123123');
		cy.get('#sign-up-password-re-enter').type('1231235');
		cy.get('#sign-up-btn').click();
		cy.get('#sign-up-password-re-enter').should('have.class', 'border-red');

		// valid password, valid retype
		cy.reload();
		cy.get('#sign-up-password').type('123123');
		cy.get('#sign-up-password-re-enter').type('123123');
		cy.get('#sign-up-btn').click();
		cy.get('#sign-up-password-re-enter').should('have.class', 'border-gray');
	});

	// We should test our validation
});
