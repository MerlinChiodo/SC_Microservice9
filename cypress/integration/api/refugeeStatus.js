// API - Refugee Status Tests
describe('Refugee Status API', () => {
  it('verify request return JSON', () => {
    cy.request('http://localhost:3000/api/refugee/asl999klf3jkla')
      .its('headers')
      .its('content-type')
      .should('include', 'application/json');
  });

  it('verfiy the request returns the correct status code', () => {
    cy.request('http://localhost:3000/api/refugee/asl999klf3jkla').its('status').should('eq', 200);
  });

  it('verify the request contains  item status', () => {
    cy.request('http://localhost:3000/api/refugee/asl999klf3jkla')
      .its('body')
      .should('have.property', 'status');
  });

  it('verify the request item is boolean', () => {
    cy.request('http://localhost:3000/api/refugee/asl999klf3jkla').its('body.status').should('be.a', 'boolean');
  });
});
