/// <reference types="cypress" />

context('Window', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('board exists', () => {
    // https://on.cypress.io/window
    cy.get('.board');
  });
});
