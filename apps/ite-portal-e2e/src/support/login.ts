const email = () => cy.get('[data-cy="email"]');
const password = () => cy.get('[data-cy="password"]');
const loginButton = () => cy.get('[data-cy="login-button"]');

export const login = () => {
  email().type('bob@example.com');
  password().type('password');
  loginButton().click();
};
