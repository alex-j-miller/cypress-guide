/// <reference types="cypress" />

describe("JSON Objects", () => {
  it("JSON Objects", () => {
    cy.openHomePage();

    const simpleObject = { key: "value", key2: "value2" };

    const simpleArrayOfValues = ["one", "two", "three"];

    const arrayOfObjects = [
      { key: "value" },
      { key2: "value2" },
      { key3: "value3" },
    ];

    const typesOfData = { string: "this is a string", number: 10 };

    const mix = {
      firstName: "Test",
      lastName: "User",
      age: 35,
      students: [
        { firstName: "Sara", lastName: "Conor" },
        { firstName: "Bruce", lastName: "Willis" },
      ],
    };

    console.log(simpleObject.key2);
  });
});
