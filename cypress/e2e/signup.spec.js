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
    cy.findByLabelText(/username/i).should("exist");
    cy.findByLabelText(/email/i).should("exist");
    cy.findByLabelText(/password/i).should("exist");
  });

  it("should be able to type into username, email and password inputs", () => {
    const { username, email, password } = userBuilder();
    cy.typeInForm(username, email, password);
    cy.get("form input").first().should("contain.value", username);
  });
});

describe("should be able to sign up", () => {
  it("should be receive a message for successful sign up and redirect to home", () => {
    cy.visit("/sign-up")
    const { username, email, password } = userBuilder()
    cy.typeInForm(username, email, password)
    cy.get("form").submit()
    cy.on("window:alert", (str) => {
      expect(str).to.eq(`You have successfully signed up`)
    })
    cy.url().should("eq", "http://localhost:8080/")
  });
});