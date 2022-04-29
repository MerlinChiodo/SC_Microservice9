// API - Refugee Status Tests
describe('Refugee Status API', () => {
  describe('Test Valid QR Code', () => {
    beforeEach(function () {
      cy.fixture('refugee').then((refugee) => {
        this.refugee = refugee;
      });
    });

    it('verify request return JSON', function () {
      cy.request(`http://localhost:3000/api/refugee/${this.refugee.qr_code}`)
        .its('headers')
        .its('content-type')
        .should('include', 'application/json');
    });

    it('verfiy the response, correct status code', function () {
      cy.request(`http://localhost:3000/api/refugee/${this.refugee.qr_code}`)
        .its('status')
        .should('eq', 200);
    });

    it('verify the response, contains item status', function () {
      cy.request(`http://localhost:3000/api/refugee/${this.refugee.qr_code}`)
        .its('body')
        .should('have.property', 'status');
    });

    it('verify the response, status is true', function () {
      cy.request(`http://localhost:3000/api/refugee/${this.refugee.qr_code}`)
        .its('body.status')
        .should('be.a', 'boolean')
        .should('eq', true);
    });
  });

  describe('Test Invalid QR Code', () => {
    beforeEach(function () {
      this.invalidQRCode = 'invalidQRCode9909020abcd';
    });

    it('verify request return JSON', function () {
      cy.request(`http://localhost:3000/api/refugee/${this.invalidQRCode}`)
        .its('headers')
        .its('content-type')
        .should('include', 'application/json');
    });

    it('verfiy the response, correct status code', function () {
      cy.request(`http://localhost:3000/api/refugee/${this.invalidQRCode}`)
        .its('status')
        .should('eq', 200);
    });

    it('verify the response, contains item status', function () {
      cy.request(`http://localhost:3000/api/refugee/${this.invalidQRCode}`)
        .its('body')
        .should('have.property', 'status');
    });

    it('verify the response, status is false', function () {
      cy.request(`http://localhost:3000/api/refugee/${this.invalidQRCode}`)
        .its('body.status')
        .should('be.a', 'boolean')
        .should('eq', false);
    });
  });

  describe('Verify Method Types', () => {

    it('GET Method', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:3000/api/refugee/test',
      })
        .its('status')
        .should('eq', 200);
    });

    it('POST Method', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/refugee/test',
        failOnStatusCode: false,
      })
        .its('status')
        .should('eq', 405);
    });

    it('DELETE Method', () => {
      cy.request({
        method: 'DELETE',
        url: 'http://localhost:3000/api/refugee/test',
        failOnStatusCode: false,
      })
        .its('status')
        .should('eq', 405);
    });

    it('PUT Method', () => {
      cy.request({
        method: 'PUT',
        url: 'http://localhost:3000/api/refugee/test',
        failOnStatusCode: false,
      })
        .its('status')
        .should('eq', 405);
    });
  });
});
