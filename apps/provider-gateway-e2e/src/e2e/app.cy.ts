describe('provider-gateway', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    cy.get('h1').contains('Provider Gateway');
  });
});