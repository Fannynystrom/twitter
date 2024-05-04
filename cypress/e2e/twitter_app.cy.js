describe('Register', () => {
  it('should register successfully with valid credentials', () => {
    cy.visit('http://localhost:5173/login');
    cy.wait(500)

    cy.get('#registerButton').click();
    cy.wait(200)
    cy.get('input[name="username"]').type('sonofgod');
    cy.wait(200)
    cy.get('input[name="password"]').type('love123');
    cy.wait(200)
    cy.get('input[name="confirmPassword"]').type('love123');
    cy.wait(200)
    cy.get('input[name="firstName"]').type('Jesus');
    cy.wait(200)
    cy.get('input[name="lastName"]').type('Christ');
    cy.wait(200)
    cy.get('input[name="email"]').type('jesus.christ@heaven.com');
    cy.wait(200)
    cy.get('input[name="about"]').type('Savior, healer, and teacher');
    cy.wait(200)
    cy.get('input[name="work"]').type('Spreading love and compassion');
    cy.wait(200)
    cy.get('input[name="website"]').type('www.salvation.org');
    cy.wait(200) 
    cy.get('#register').click();
  })
});

describe('Login', () => {
  it('should log in successfully with valid credentials', () => {
    cy.visit('http://localhost:5173/login');
    
    cy.get('input[type="text"]').type('PellePer'); 
    cy.wait(500)
    cy.get('input[type="password"]').type('per'); 
    cy.wait(500)
    cy.get('button[type="submit"]').click();
    cy.wait(500)
    cy.get('#logoutButton').click();
    cy.wait(500)
    cy.contains('Japp!').click();
  });
});

