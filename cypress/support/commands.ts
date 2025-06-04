/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      fillLoginForm(email: string, password: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add("fillLoginForm", (email: string, password: string) => {
  cy.get('input[placeholder*="email" i]').type(email);
  cy.get('input[placeholder*="password" i]').type(password);
});

Cypress.Commands.add("login", (email: string, password: string) => {
  cy.fillLoginForm(email, password);
  cy.get('button[type="submit"]').click();
});

export {};
