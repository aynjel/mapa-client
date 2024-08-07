/// <reference types="cypress" />

it("should display the right title", () => {
  cy.title().should("eq", "Mapa");
});
