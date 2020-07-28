import { userBuilder } from "../support/generate";

describe("when clicking on Sign Up from homepage user", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.findByTestId("signup").click();
  });

  it("should go to the login page", () => {
    cy.url().should("include", "/sign-up");
  });

  it("should see h1", () => {
    cy.get("h1").should("contain.text", "Sign Up");
  });

  it("should see a form with email and password inputs", () => {
    cy.findByTestId("username").should("exist");
    cy.findByTestId("email").should("exist");
    cy.findByTestId("password").should("exist");
  });

  it("should be able to type into username, email and password inputs", () => {
    const { username, email, password } = userBuilder();
    cy.typeInForm(username, email, password);
    cy.get("form input").first().should("contain.value", username);
  });
});

describe("should not able to sign up with an existing email in the database", () => {
  it("should be receive an error message", () => {
    cy.getUser().then(({ username, email, password }) => {
      cy.visit("/sign-up");
      cy.typeInForm(username, email, password);
      cy.get("form").submit();
      cy.findByTestId("signup-error").should(
        "contain.text",
        "Username has already been taken,Email has already been taken"
      );
    });
  });
});

describe("should be able to sign up", () => {
  it("should be receive a message for successful sign up and redirect to login", () => {
    cy.visit("/sign-up");
    const { username, email, password } = userBuilder();
    cy.typeInForm(username, email, password);
    cy.get("form").submit();
    cy.on("window:alert", (str) => {
      expect(str).to.eq(
        `You have successfully created an account! Please log in.`
      );
    });
    cy.url().should("eq", "http://localhost:8080/login");
  });
});
