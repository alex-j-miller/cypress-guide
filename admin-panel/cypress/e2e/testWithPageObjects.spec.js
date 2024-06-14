/// <reference types="cypress" />

const { navigateTo } = require("../support/page_objects/navigationPage");
const {
  onFormLayoutsPage,
} = require("../support/page_objects/formLayoutsPage");
const { onDatepickerPage } = require("../support/page_objects/datepickerPage");
const { onSmartTablePage } = require("../support/page_objects/smartTablePage");

describe("Test with Page Objects", () => {
  beforeEach("Open application", () => {
    cy.openHomePage();
  });

  it("Verify Navigation Across the Pages", () => {
    navigateTo.formLayoutsPage();
    navigateTo.datepickerPage();
    navigateTo.smartTablePage();
    navigateTo.toastrPage();
    navigateTo.tooltipPage();
  });

  it("Should submit Inline and Basic Form and select tomorrow date in the calendar", () => {
    navigateTo.formLayoutsPage();
    onFormLayoutsPage.submitInlineFormWithNameAndEmail(
      "Jane Doe",
      "test@test.com"
    );
    onFormLayoutsPage.submitBasicFormWithEmailAndPassword(
      "test@test.com",
      "password"
    );

    navigateTo.datepickerPage();
    onDatepickerPage.selectCommonDatepcikerDateFromToday(400);
    onDatepickerPage.selectDatepickerWithRangeFromToday(100, 200);

    navigateTo.smartTablePage();
    onSmartTablePage.addNewRecordWithFirstAndLastName("Jane", "Doe");
    onSmartTablePage.updateAgeByFirstName("Jane", "35");
    onSmartTablePage.deleteRowByIndex(1);
  });
});
