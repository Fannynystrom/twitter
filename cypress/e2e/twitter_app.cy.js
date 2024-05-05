describe('Register', () => {
  it('should register successfully with valid credentials', () => {
    cy.visit('http://localhost:5173/login');
    cy.wait(500)

    cy.get('#registerButton').click();
    cy.wait(500)
    cy.get('input[name="username"]').type('sonofgod');
    cy.wait(500)
    cy.get('input[name="password"]').type('love123');
    cy.wait(500)
    cy.get('input[name="confirmPassword"]').type('love123');
    cy.wait(500)
    cy.get('input[name="firstName"]').type('Jesus');
    cy.wait(500)
    cy.get('input[name="lastName"]').type('Christ');
    cy.wait(500)
    cy.get('input[name="email"]').type('jesus.christ@heaven.com');
    cy.wait(500)
    cy.get('input[name="about"]').type('Savior, healer, and teacher');
    cy.wait(500)
    cy.get('input[name="work"]').type('Spreading love and compassion');
    cy.wait(500)
    cy.get('input[name="website"]').type('www.salvation.org');
    cy.wait(500) 
    cy.get('#register').click();
  })
});

describe('Login and logout', () => {
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

describe('Profile checkout, followers and folloing', () => {
  it('should log in successfully with valid credentials', () => {
    cy.visit('http://localhost:5173/login');
    
    cy.get('input[type="text"]').type('PellePer'); 
    cy.wait(500)
    cy.get('input[type="password"]').type('per'); 
    cy.wait(500)
    cy.get('button[type="submit"]').click();
    cy.wait(500)
    cy.contains('Profil').click();
    cy.wait(500)
    cy.contains('följer').click();
    cy.wait(500)
    cy.contains('följare').click();
    cy.wait(500)
  });
});


describe('Post woof and use search function', () => {
  it('should log in successfully with valid credentials', () => {
    cy.visit('http://localhost:5173/');
    
    cy.get('input[type="text"]').type('PellePer'); 
    cy.wait(500)
    cy.get('input[type="password"]').type('per'); 
    cy.wait(500)
    cy.get('button[type="submit"]').click();
    cy.wait(1000)

    // testar sökfunktionen
    cy.get('input[type="text"]').type('tes');
    cy.get('button[type="submit"]').click();
    cy.wait(500)

    // testar att posta en woof
    cy.get('#woofpost').type('#CarroTheTester');
    cy.wait(500)
    cy.get('#woofsubmit').click();
    cy.wait(500)
    cy.contains('Profil').click();

  });
});
