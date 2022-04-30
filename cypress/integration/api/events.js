// RabbitMQ - Events
describe('Events RabbitMQ', () => {
  // Event Register Refugee Tests
  describe('Event Register Refugee', () => {
    describe('Valid Refugee Data for Event', () => {
      beforeEach(function () {
        cy.fixture('events/refugee').then((refugee) => {
          this.refugee = refugee;
        });
      });

      it('verify valid request', function () {
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/events/buergerbuero`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.refugee,
        })
          .its('status')
          .should('eq', 200);
      });
    });

    describe('Invalid Refugee Data for Event', () => {
      beforeEach(function () {
        cy.fixture('events/refugee').then((refugee) => {
          this.refugee = refugee;
        });
      });

      it('verify no date_of_birth attribute', function () {
        delete this.refugee.date_of_birth;
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/events/buergerbuero`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.refugee,
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 400);
      });

      it('verify no email attribute', function () {
        delete this.refugee.email;
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/events/buergerbuero`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.refugee,
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 400);
      });

      it('verify no fistname attribute', function () {
        delete this.refugee.firstname;
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/events/buergerbuero`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.refugee,
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 400);
      });

      it('verify no lastname attribute', function () {
        delete this.refugee.lastname;
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/events/buergerbuero`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.refugee,
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 400);
      });

      it('verify invalid date format', function () {
        this.refugee.date_of_birth = '01-01-1977';
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/events/buergerbuero`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.refugee,
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 400);
      });

      it('verify invalid email format', function () {
        this.refugee.email = 'testtest.com';
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/events/buergerbuero`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.refugee,
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 400);
      });

      it('verify invalid firstname format', function () {
        this.refugee.firstname = '';
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/events/buergerbuero`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.refugee,
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 400);
      });

      it('verify invalid lastname format', function () {
        this.refugee.lastname = '';
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/events/buergerbuero`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.refugee,
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 400);
      });
    });

    describe('Verify Wrong Method Types', () => {
      it('GET Method', () => {
        cy.request({
          method: 'GET',
          url: 'http://localhost:3000/api/events/buergerbuero',
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 405);
      });

      it('DELETE Method', () => {
        cy.request({
          method: 'DELETE',
          url: 'http://localhost:3000/api/events/buergerbuero',
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 405);
      });

      it('PUT Method', () => {
        cy.request({
          method: 'PUT',
          url: 'http://localhost:3000/api/events/buergerbuero',
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 405);
      });
    });
  });

