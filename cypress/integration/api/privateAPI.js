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

  // Event New Post Forum Tests
  describe('Event Newsletter Post', () => {
    describe('Valid Post Data for Event', () => {
      beforeEach(function () {
        cy.fixture('events/post').then((post) => {
          this.post = post;
        });
      });

      it('verify valid request', function () {
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/private/post`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.post,
        })
          .its('status')
          .should('eq', 200);
      });

      it('verify valid optional picture_url', function () {
        delete this.post.picture_url;
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/private/post`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.post,
        })
          .its('status')
          .should('eq', 200);
      });
    });

    describe('Invalid About Us Data for Event', () => {
      beforeEach(function () {
        cy.fixture('events/post').then((post) => {
          this.post = post;
        });
      });

      it('verify no title attribute', function () {
        delete this.post.title;
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/private/post`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.post,
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 400);
      });

      it('verify no text attribute', function () {
        delete this.post.text;
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/private/post`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.post,
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 400);
      });

      it('verify no date attribute', function () {
        delete this.post.date;
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/private/post`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.post,
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 400);
      });

      it('verify wrong title format', function () {
        this.post.title = '';
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/private/post`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.post,
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 400);
      });

      it('verify wrong text format', function () {
        this.post.text = '';
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/private/post`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.post,
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 400);
      });

      it('verify wrong date format', function () {
        this.post.date = '20-04-2022';
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/private/post`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.post,
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
          url: 'http://localhost:3000/api/private/post',
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 405);
      });

      it('DELETE Method', () => {
        cy.request({
          method: 'DELETE',
          url: 'http://localhost:3000/api/private/post',
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 405);
      });

      it('PUT Method', () => {
        cy.request({
          method: 'PUT',
          url: 'http://localhost:3000/api/private/post',
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 405);
      });
    });
  });
});
