/// <reference types="cypress" />

describe("First Test Suite", () => {
  it("First Case", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // Get by tag name
    cy.get("input");

    // Get by ID
    cy.get("#inputEmail1");

    // Get by class value
    cy.get(".input-full-width");

    // Get by attribute name
    cy.get("[fullwidth]");

    // Get by attribute name and value
    cy.get("[placeholder='Email']");

    // Get by entire class value
    cy.get("[class='input-full-width size-medium shape-rectangle']");

    // Get by two different attributes
    cy.get("[placeholder='Email'][fullwidth]");

    // Get by tag, attrobute with value, ID and class name
    cy.get("input[placeholder='Email']#inputEmail1.input-full-width");

    // Get by Cypress Test ID
    cy.get("[data-cy='imputEmail1']");
  });
});
