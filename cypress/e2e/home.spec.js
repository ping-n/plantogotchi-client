describe("render homepage", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("expect page to have a title", () => {
    cy.title().should("eq", "Plantogotchi")
  })

    it("expect page to have a h1", () => {
    cy.get("h1").should("contain.text", "PLANTOGOTCHI")
  })

  it("render nav with links", () => {
    cy.get("nav").contains("Home")
    cy.get("nav").contains("Login")
    cy.get("nav").contains("Sign Up")
  });

  it("render footer with links", () => {
    cy.get("footer").contains("ABOUT")
    cy.get("footer").contains("FAQ")
    cy.get("footer").contains("@2020")
  });

});
