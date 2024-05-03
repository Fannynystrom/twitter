describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/login')
  })
})


// describe('Login', () => {
//   it('logs in successfully', () => {
//     cy.visit('http://localhost:5173/login');

//     cy.get('input[name="username"]').type('testuser');
//     cy.get('input[name="password"]').type('testpassword');

//     cy.get('button[type="submit"]').click();

//     cy.url().should('include', '/home');
//   });

//   it('displays an error message when the password is incorrect', () => {
//     cy.visit('http://localhost:5173/login');

//     cy.get('input[name="username"]').type('testuser');
//     cy.get('input[name="password"]').type('incorrectpassword');

//     cy.get('button[type="submit"]').click();

//     cy.get('div').contains('Incorrect password');
//   });
// });


