describe('ite-portal', () => {
  beforeEach(() => cy.visit('/'));

  it('should fill out the entire form with valid data', () => {
    cy.intercept(
      {
        method: 'POST',
        url: 'https://ite-api.herokuapp.com/api/v1/extracts/ingest',
      },
      {}
    ).as('submitExtract');

    const today = new Date().toISOString().slice(0, 10);
    cy.get('[data-cy="extract-date"]').type(today);
    cy.get('input[type=file]').selectFile('src/fixtures/test.csv', {
      force: true,
    });
    cy.get('[data-cy="record-group-admission"]').click();
    cy.get('[data-cy="submit-extract"]').should('not.be.disabled');
    cy.get('[data-cy="submit-extract"]').click();
    cy.wait('@submitExtract');
  });
});
