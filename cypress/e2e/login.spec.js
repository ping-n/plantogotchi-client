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

  it("should see a form with email and password inputs", () => {
    cy.findByPlaceholderText(/email/i).should("exist");
    cy.findByPlaceholderText(/password/i).should("exist");
  });

  it("should be able to type into email and password inputs", () => {
    const { email, password } = userBuilder();
    cy.typeInLogin(email, password);
    cy.get("form input").first().should("contain.value", email);
  });
});

describe("with incorrect login credentials user", () => {
  it("should receive an error message above login form", () => {
    cy.visit("/login")
    const { email, password } = userBuilder()
    cy.typeInLogin(email, password)
    cy.get("form").submit()
    cy.findByTestId("login-error").should("contain.text", "Incorrect credentials")
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

  after(() => {
    window.localStorage.removeItem("token")
    window.sessionStorage.removeItem("auth")
  })
});
