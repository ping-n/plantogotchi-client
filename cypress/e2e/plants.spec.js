describe('When logged in, User', () => {
  beforeEach(() => {
    cy.visit("/");
    cy.findByTestId("login").click();
  });
})
