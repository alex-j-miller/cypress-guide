/// <reference types="cypress" />

// URLs to USE
// App: https://conduit.bondaracademy.com/
// API: https://conduit-api.bondaracademy.com/

describe("Test with backend", () => {
  beforeEach("Login", () => {
    cy.loginToApp();
  });

  it("Verify correct request and response", () => {
    cy.intercept("POST", "**/articles").as("postArticles");

    cy.contains("New Article").click();
    cy.get("[formcontrolname='title']").type("Test " + Math.random());
    cy.get("[formcontrolname='description']").type("Test");
    cy.get("[formcontrolname='body']").type("Test");
    cy.contains("Publish Article").click();

    cy.wait("@postArticles").then((xhr) => {
      console.log(xhr);
      expect(xhr.response.statusCode).to.equal(201);
      expect(xhr.request.body.article.body).to.equal("Test");
      expect(xhr.response.body.article.description).to.equal("Test");
    });
  });
});
