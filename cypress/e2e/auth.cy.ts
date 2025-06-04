describe("Authentication Flow", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the login page", () => {
    cy.contains("Login to your Account").should("be.visible");
    cy.get('input[placeholder*="email" i]').should("be.visible");
    cy.get('input[placeholder*="password" i]').should("be.visible");
  });

  it("should show validation errors for empty form submission", () => {
    cy.get('button[type="submit"]').click();
    // Adjust these selectors based on your actual error display
    cy.get('[role="alert"]').should("exist");
  });

  it("should toggle password visibility", () => {
    cy.get('input[placeholder*="password" i]').should(
      "have.attr",
      "type",
      "password"
    );
    cy.get('button[aria-label*="Show password"]').click();
    cy.get('input[placeholder*="password" i]').should(
      "have.attr",
      "type",
      "text"
    );
  });

  it("should allow valid login with correct credentials", () => {
      cy.get('input[placeholder*="email" i]').type("demo@example.com");
      cy.get('input[placeholder*="password" i]').type("password123");
      cy.get('button[type="submit"]').click();
      cy.contains("Successfully logged in as demo").should("be.visible");
    });
  

  it("should navigate to register page", () => {
      cy.contains("Create an account").click();
      cy.contains("Create your Account").should("be.visible");
    });
  
    it("should allow user registration", () => {
      cy.contains("Create an account").click();
      cy.get('input[placeholder*="name" i]').type("Test User");
      cy.get('input[placeholder*="email" i]').type("test@example.com");
      cy.get('input[placeholder*="password" i]').type("Password123!");
      cy.get('button[type="submit"]').click();
    });
  
    it("should show validation errors for invalid registration", () => {
      cy.contains("Create an account").click();
      cy.get('button[type="submit"]').click();
      cy.get('[role="alert"]').should("exist");
      
      // Test invalid email format
      cy.get('input[placeholder*="email" i]').type("invalid-email");
      cy.get('button[type="submit"]').click();
      cy.get('[role="alert"]').should("contain", "valid email");
      
      // Test password requirements
      cy.get('input[placeholder*="password" i]').type("short");
      cy.get('button[type="submit"]').click();
      cy.get('[role="alert"]').should("exist");
    });  
});
