describe('provider-gateway', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    cy.get('.application-title').contains('Provider Gateway');
  });
});
