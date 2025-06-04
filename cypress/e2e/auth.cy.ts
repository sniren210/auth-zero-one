describe("Authentication Flow", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display login form by default", () => {
    cy.contains("Sign in to your account").should("be.visible");
    cy.get('input[placeholder*="email" i]').should("be.visible");
    cy.get('input[placeholder*="password" i]').should("be.visible");
    cy.get('button[type="submit"]').should("contain", "Sign In");
  });

  it("should toggle between login and register forms", () => {
    // Should start with login form
    cy.contains("Sign in to your account").should("be.visible");
    cy.get('button[type="submit"]').should("contain", "Sign In");

    // Switch to register
    cy.contains("Don't have an account?").parent().find("button").click();

    cy.contains("Create your account").should("be.visible");
    cy.get('input[placeholder*="name" i]').should("be.visible");
    cy.get('button[type="submit"]').should("contain", "Sign Up");

    // Switch back to login
    cy.contains("Already have an account?").parent().find("button").click();

    cy.contains("Sign in to your account").should("be.visible");
    cy.get('button[type="submit"]').should("contain", "Sign In");
  });

  it("should show validation errors for empty fields", () => {
    cy.get('button[type="submit"]').click();

    // Should show validation errors (adjust based on your actual error messages)
    cy.get('[role="alert"]').should("be.visible");
  });

  it("should handle successful login flow", () => {
    cy.fixture("users").then((users) => {
      cy.fillLoginForm(users.validUser.email, users.validUser.password);
      cy.get('button[type="submit"]').click();

      // Should show success state or redirect
      cy.contains("Welcome!").should("be.visible");
    });
  });

  it("should handle Google login", () => {
    cy.contains("Continue with Google").click();

    // Should show alert (in real app, would handle OAuth flow)
    cy.window().its("alert").should("have.been.called");
  });
});
