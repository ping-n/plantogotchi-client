import { userBuilder } from "../support/generate";

describe("when clicking on login from homepage user", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.findByTestId("login").click();
  });

  it("should go to the login page", () => {
    cy.url().should("include", "/login");
  });

  it("should see h1", () => {
    cy.get("h1").should("contain.text", "Login");
  });

  it("should see email and password inputs", () => {
    cy.findByLabelText(/email/i).should("exist");
    cy.findByLabelText(/password/i).should("exist");
  });

  it("should be able to type into email and password inputs", () => {
    const { email, password } = userBuilder();
    cy.typeInLogin(email, password);
    cy.get("form input").first().should("contain.value", email);
  });
});

describe("with correct login credentials user", () => {
  it("should be click on submit and be navigate to plants", () => {
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
});
