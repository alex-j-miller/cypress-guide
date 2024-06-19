/// <reference types="cypress" />

// URLs to USE
// App: https://conduit.bondaracademy.com/
// API: https://conduit-api.bondaracademy.com/

describe("Test with backend", () => {
  beforeEach("Login", () => {
    cy.intercept("GET", "https://conduit-api.bondaracademy.com/api/tags", {
      fixture: "tags.json",
    });
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

  it("Verify Popular Tags are Displayed", () => {
    cy.get(".tag-list")
      .should("contain", "cypress")
      .and("contain", "automation")
      .and("contain", "testing");
  });

  it("Verify Global Feed Likes Count", () => {
    cy.intercept(
      "GET",
      "https://conduit-api.bondaracademy.com/api/articles/feed*",
      {
        articles: [],
        articlesCount: 0,
      }
    );
    cy.intercept("GET", "https://conduit-api.bondaracademy.com/api/articles*", {
      fixture: "articles.json",
    });

    cy.contains("Global Feed").click();
    cy.get("app-article-list button").then((listOfButtons) => {
      expect(listOfButtons[0]).to.contain("1");
      expect(listOfButtons[1]).to.contain("5");
    });

    cy.fixture("articles.json").then((file) => {
      const articleLink = file.articles[1].slug;
      file.articles[1].favoritesCount += 1;
      cy.intercept(
        "POST",
        `https://conduit-api.bondaracademy.com/api/articles/${articleLink}/favorite`,
        file
      );
    });

    cy.get("app-article-list button").eq(1).click().should("contain", "6");
  });

  it("Delete a New Article in a Global Feed", () => {
    const bodyRequest = {
      article: {
        title: "API Test",
        description: "Test",
        body: "Test",
        tagList: ["cypress"],
      },
    };

    cy.get("@token").then((token) => {
      cy.request({
        url: "https://conduit-api.bondaracademy.com/api/articles",
        headers: {
          authorization: `Token ${token}`,
          method: "POST",
          body: bodyRequest,
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
      });

      cy.contains("Global Feed").click();
      cy.get(".preview-link").first().click();
      cy.get(".article-actions").contains("Delete Article").click();

      cy.request({
        url: "https://conduit-api.bondaracademy.com/api/articles",
        headers: {
          authorization: `Token ${token}`,
          method: "GET",
        },
      })
        .its("body")
        .then((body) => {
          expect(body.articles[0].title).not.to.equal("API Test");
        });
    });
  });
});
