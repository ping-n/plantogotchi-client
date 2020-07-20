describe('when clicking on login link from homepage', () => {
  beforeEach(() => {
    cy.visit("/");
    cy.findByText(/Login/).click();
    cy.url().should("include", "/login")
  })
})

