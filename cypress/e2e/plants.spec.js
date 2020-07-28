describe("When logged in, User", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.findByTestId("login").click();
    cy.getUser().then(({ email, password }) => {
      cy.visit("/login");
      cy.typeInLogin(email, password);
      cy.get("form").submit();
      cy.url()
        .should("eq", "http://localhost:8080/plants")
        .window()
        .its("localStorage.token")
        .should("be.a", "string");
    });
  });

  it("should able fill in the create plant form and be taken to the plants page", () => {
    cy.visit("/createplant");
    cy.findByTestId("name").type("name");
    cy.findByTestId("breed")
      .click()
      .findAllByRole("option")
      .then((subject) => {
        const option1 = subject[0].children[0].innerText;
        expect(option1).eq("Lily");
        subject[0].click();
        cy.get("form").submit();
        cy.url().should("eq", "http://localhost:8080/plants");
      });
  });

  after(() => {
    cy.findByTestId("logout").click();
  });
});
