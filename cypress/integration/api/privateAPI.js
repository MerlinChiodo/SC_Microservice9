// RabbitMQ - Events
describe('Events RabbitMQ', () => {
  // Event Updating About Us Tests
  describe('Event Update About Us on Landing Page', () => {
    describe('Valid About Us Data for Event', () => {
      beforeEach(function () {
        cy.fixture('events/aboutus').then((aboutus) => {
          this.aboutus = aboutus;
        });
      });

      it('verify valid request', function () {
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/private/aboutus`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.aboutus,
        })
          .its('status')
          .should('eq', 200);
      });
    });

    describe('Invalid About Us Data for Event', () => {
      beforeEach(function () {
        cy.fixture('events/aboutus').then((aboutus) => {
          this.aboutus = aboutus;
        });
      });

      it('verify no about_us attribute', function () {
        delete this.aboutus.about_us;
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/private/aboutus`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.aboutus,
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 400);
      });

      it('verify no picture attribute', function () {
        delete this.aboutus.picture;
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/private/aboutus`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.aboutus,
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 400);
      });

      it('verify wrong about_us format', function () {
        this.aboutus.about_us = '';
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/private/aboutus`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.aboutus,
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 400);
      });

      it('verify wrong picture format', function () {
        this.aboutus.picture = '';
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/private/aboutus`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.aboutus,
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
          url: `http://localhost:3000/api/private/aboutus`,
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 405);
      });

      it('DELETE Method', () => {
        cy.request({
          method: 'DELETE',
          url: `http://localhost:3000/api/private/aboutus`,
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 405);
      });

      it('PUT Method', () => {
        cy.request({
          method: 'PUT',
          url: `http://localhost:3000/api/private/aboutus`,
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 405);
      });
    });
  });

});
