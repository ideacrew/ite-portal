const cypressToken = (userType: 'dbh' | 'provider' | 'both'): string => {
  const exp = Date.now() + 1000 * 60 * 60 * 24 * 7;
  const email = `${userType}_user@example.com`;
  const token = JSON.stringify({
    dbh_user: userType === 'dbh' || userType === 'both',
    provider: userType === 'provider' || userType === 'both',
    provider_gateway_identifier: '123',
    provider_id: 'a1b2c3',
    email,
    iss: 'Cypress',
    exp,
  });
  return `cypressToken.${btoa(token)}`;
};

describe('provider-gateway', () => {
  beforeEach(() => {
    window.localStorage.setItem(
      '__jwt_authorization_current_token',
      cypressToken('provider')
    );
    cy.visit('/');
  });

  it('should display welcome message', () => {
    cy.get('.application-title').contains('Provider Gateway');
  });
});
