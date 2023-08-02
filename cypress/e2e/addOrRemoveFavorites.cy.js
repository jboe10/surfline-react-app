/// <reference types="cypress" />

describe('add and remove favorite spots', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});

	it('open modal on click', () => {
		// modal should not be open before click
		cy.get('#add-favorite-spots-modal').should('not.exist');

		// click too open add/remove spots modal
		cy.get('#add-favorite-open-modal').click();

		// modal should be open
		cy.get('#add-favorite-spots-modal').should('exist');
	});

	it('DESKTOP - close modal on click off', () => {
		// click too open add/remove spots modal
		cy.get('#add-favorite-open-modal').click();

		// modal should be open
		cy.get('#add-favorite-spots-modal').should('exist');

		// modal should close after clicking outside of it
		cy.get('#add-favorite-spots-modal-outside').click('topRight');
		cy.get('#add-favorite-spots-modal').should('not.exist');
	});
	it('close modal on cancel modal click', () => {
		// click too open add/remove spots modal
		cy.get('#add-favorite-open-modal').click();

		// modal should be open
		cy.get('#add-favorite-spots-modal').should('exist');

		// modal should close after clicking on cancel button
		cy.get('#cancel-add-favorite').click();
		cy.get('#add-favorite-spots-modal').should('not.exist');
	});
	it('check we are rendering the correct favorite spots', () => {});
	it('check that our starting favorites are checked', () => {});
	it('make sure our checkboxes get checked and unchecked on click', () => {});
	it('make sure when we cancel it does not save those spots', () => {});
	it('make sure our spots change when we want to save new spots', () => {});

	// We should test our validation
});
