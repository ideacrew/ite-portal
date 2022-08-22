import { getExtractDate } from '../support/app.po';

describe('ite-portal', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'POST',
        url: '**/api/v1/extracts/ingest',
      },
      {}
    ).as('submitExtract');

    cy.intercept(
      {
        method: 'GET',
        url: '**/api/v1/providers',
      },
      { fixture: 'providers.json' }
    );
    cy.visit('/'); // Initial intercept setup
  });

  it('should fill out the entire form with valid data', () => {
    // Fill out the form
    const today = new Date().toISOString().slice(0, 10);
    getExtractDate().type(today);
    cy.get('[data-cy="file-upload"]').selectFile('src/fixtures/test.csv');
    cy.get('[data-cy="submit-extract"]').should('not.be.disabled');
    cy.get('[data-cy="submit-extract"]').click();

    // Wait for API call to complete
    cy.wait('@submitExtract').then(({ request }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const records: unknown[] = request.body.records;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(records.length).to.equal(11);
    });
  });

  it('should fill out the entire form with more valid data', () => {
    // Fill out the form
    const today = new Date().toISOString().slice(0, 10);
    getExtractDate().type(today);
    cy.get('[data-cy="file-upload"]').selectFile('src/fixtures/test2.csv');
    cy.get('[data-cy="submit-extract"]').should('not.be.disabled');
    cy.get('[data-cy="submit-extract"]').click();

    // Wait for API call to complete
    cy.wait('@submitExtract').then(({ request }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const records: unknown[] = request.body.records;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(records.length).to.equal(15);
    });
  });

  it('should show error message on invalid csv', () => {
    const dateInThePast = new Date('2020-01-01').toISOString().slice(0, 10);
    getExtractDate().type(dateInThePast);
    cy.get('[data-cy="extract-date-error"]').should('exist');
  });
});
