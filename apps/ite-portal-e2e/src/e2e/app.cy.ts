import { getExtractDate } from '../support/app.po';

describe('ite-portal', () => {
  beforeEach(() => cy.visit('/'));

  it('should fill out the entire form with valid data', () => {
    // Initial intercept setup
    cy.intercept(
      {
        method: 'POST',
        url: 'https://ite-api.herokuapp.com/api/v1/extracts/ingest',
      },
      {}
    ).as('submitExtract');

    // Fill out the form
    const today = new Date().toISOString().slice(0, 10);
    getExtractDate().type(today);
    cy.get('[data-cy="file-upload"]').selectFile('src/fixtures/test.csv');
    cy.get('[data-cy="submit-extract"]').should('not.be.disabled');
    cy.get('[data-cy="submit-extract"]').click();

    // Wait for API call to complete
    cy.wait('@submitExtract');
  });

  it('should show error message on invalid csv', () => {
    const dateInThePast = new Date('2020-01-01').toISOString().slice(0, 10);
    getExtractDate().type(dateInThePast);
    cy.get('[data-cy="extract-date-error"]').should('exist');
  });
});
