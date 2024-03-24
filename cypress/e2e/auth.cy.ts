describe("authentication", () => {
  it("go to home after authentication", () => {
    cy.visit("http://localhost:5173/login");
    cy.get("#email-input").type("prospecto@vitawallet.io");
    cy.get("#password-input").type("Vita.1212");
    cy.get("#login-button").click();
  });
});
