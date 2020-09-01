describe("basic integration test", () => {
  it("opens the page successfully", () => {
    cy.visit("http://localhost:3000");
  });

  it("heading is loaded, means our component is mounted", () => {
    cy.get("h2").should(
      "have.text",
      "48-hour Weather forcast powered by Weatherzone"
    );
  });

  it("dropdown is populated and we can select 'Sydney' from the available options", () => {
    cy.get("select").select("Sydney");
  });

  it("dropdown 'Sydney' is selected which loads the graph", () => {
    cy.wait(3000);
    cy.get(".metrogram");
  });

  it("data table is displayed by-default and on clicking the show/hide button makes it dissappear", () => {
    cy.get("table").should("exist");
    cy.get("#toggleShowTableData").click();
    cy.get("table").should("not.exist");
  });
});
