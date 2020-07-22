describe("render homepage, user", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should see a title", () => {
    cy.title().should("eq", "Plantogotchi")
  })

    it("should see a main header", () => {
    cy.get("h1").should("contain.text", "PLANTOGOTCHI")
  })

  it("should see nav with links", () => {
    cy.get("nav").contains("Home")
    cy.get("nav").contains("Login")
    cy.get("nav").contains("Sign Up")
  });

  it("should see footer with links", () => {
    cy.get("footer").contains("ABOUT")
    cy.get("footer").contains("FAQ")
    cy.get("footer").contains("@2020")
  });

});
