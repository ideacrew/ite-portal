import { getGreeting } from '../support/app.po';

describe('ite-portal', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Integrated Technology Engine');
  });
});
