export {};

describe('Private API', () => {
  describe('POST api/private/register', () => {
    before(function () {
      cy.fixture('privateAPI/refugee').then((refugee) => {
        this.refugee = refugee;
      });
      cy.fixture('privateAPI/refugeeInvalid').then((refugee) => {
        this.refugeeInvalid = refugee;
      });
    });

    it('valid request', function () {
      cy.request({
        method: 'POST',
        url: `api/private/register`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: this.refugee,
      }).should((response) => {
        expect(response).property('status').to.equal(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('success');
      });
    });

    it('invalid request', function () {
      cy.request({
        method: 'POST',
        url: `api/private/register`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: this.refugeeInvalid,
        failOnStatusCode: false,
      }).should((response) => {
        expect(response).property('status').to.equal(400);
        expect(response.body).to.have.property('message');
      });
    });
  });

  describe('GET api/private/register/accept', () => {
    it('valid request', function () {
      cy.request('api/private/register/accept/1').should((response) => {
        expect(response).property('status').to.equal(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('success');
      });
    });

    it('invalid request', function () {
      cy.request({ url: 'api/private/register/accept/10000', failOnStatusCode: false }).should(
        (response) => {
          expect(response).property('status').to.equal(404);
          expect(response.body).to.have.property('message');
        }
      );
    });
  });

  describe('DELETE api/private/register/:id', () => {
    it('valid request', function () {
      cy.request({
        method: 'DELETE',
        url: `api/private/register/2`,
      }).should((response) => {
        expect(response).property('status').to.equal(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('success');
      });
    });

    it('invalid request', function () {
      cy.request({
        method: 'DELETE',
        url: `api/private/register/10000`,
        failOnStatusCode: false,
      }).should((response) => {
        expect(response).property('status').to.equal(500);
      });
    });
  });

  describe('POST api/private/post', () => {
    before(function () {
      cy.fixture('privateAPI/post').then((post) => {
        this.post = post;
      });
      cy.fixture('privateAPI/postInvalid').then((post) => {
        this.postInvalid = post;
      });
    });

    it('valid request', function () {
      cy.request({
        method: 'POST',
        url: `api/private/post`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: this.post,
      }).should((response) => {
        expect(response).property('status').to.equal(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('success');
      });
    });

    it('invalid request', function () {
      cy.request({
        method: 'POST',
        url: `api/private/post`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: this.postInvalid,
        failOnStatusCode: false,
      }).should((response) => {
        expect(response).property('status').to.equal(400);
        expect(response.body).to.have.property('message');
      });
    });
  });

  describe('GET api/private/post/drafts', () => {
    it('valid request', function () {
      cy.request('api/private/post/drafts').should((response) => {
        expect(response).property('status').to.equal(200);
        expect(response.headers['content-type']).to.equal('application/json; charset=utf-8');
      });
    });
  });

  describe('DELETE api/private/post/:id', () => {
    it('valid request', function () {
      cy.request({
        method: 'DELETE',
        url: `api/private/post/2`,
      }).should((response) => {
        expect(response).property('status').to.equal(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('success');
      });
    });

    it('invalid request', function () {
      cy.request({
        method: 'DELETE',
        url: `api/private/post/10000`,
        failOnStatusCode: false,
      }).should((response) => {
        expect(response).property('status').to.equal(500);
      });
    });
  });

  describe('GET api/private/post/publish/:id', () => {
    it('valid request', function () {
      cy.request('api/private/post/publish/1').should((response) => {
        expect(response).property('status').to.equal(200);
        expect(response.headers['content-type']).to.equal('application/json; charset=utf-8');
      });
    });

    it('invalid request', function () {
      cy.request({
        url: 'api/private/post/publish/10000',
        failOnStatusCode: false,
      }).should((response) => {
        expect(response).property('status').to.equal(404);
        expect(response.body).to.have.property('message');
      });
    });
  });

  describe('POST api/private/kita/publish', () => {
    before(function () {
      cy.fixture('privateAPI/kita').then((kita) => {
        this.kita = kita;
      });
      cy.fixture('privateAPI/kitaInvalid').then((kita) => {
        this.kitaInvalid = kita;
      });
    });

    it('valid request', function () {
      cy.request({
        method: 'POST',
        url: `api/private/kita/publish`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: this.kita,
      }).should((response) => {
        expect(response).property('status').to.equal(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('success');
      });
    });

    it('invalid request', function () {
      cy.request({
        method: 'POST',
        url: `api/private/kita/publish`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: this.kitaInvalid,
        failOnStatusCode: false,
      }).should((response) => {
        expect(response).property('status').to.equal(400);
        expect(response.body).to.have.property('message');
      });
    });
  });

  describe('GET api/private/housing', () => {
    it('valid request', function () {
      cy.request('api/private/housing').should((response) => {
        expect(response).property('status').to.equal(200);
        expect(response.headers['content-type']).to.equal('application/json; charset=utf-8');
      });
    });
  });

  describe('POST api/private/housing', () => {
    before(function () {
      cy.fixture('privateAPI/housing').then((housing) => {
        this.housing = housing;
      });
      cy.fixture('privateAPI/housingInvalid').then((housing) => {
        this.housingInvalid = housing;
      });
    });

    it('valid request', function () {
      cy.request({
        method: 'POST',
        url: `api/private/housing`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: this.housing,
      }).should((response) => {
        expect(response).property('status').to.equal(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('success');
      });
    });

    it('invalid request', function () {
      cy.request({
        method: 'POST',
        url: `api/private/housing`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: this.housingInvalid,
        failOnStatusCode: false,
      }).should((response) => {
        expect(response).property('status').to.equal(400);
        expect(response.body).to.have.property('message');
      });
    });
  });

  describe('DELETE api/private/housing', () => {
    it('valid request', function () {
      cy.request({
        method: 'DELETE',
        url: `api/private/housing/2`,
      }).should((response) => {
        expect(response).property('status').to.equal(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('success');
      });
    });

    it('invalid request', function () {
      cy.request({
        method: 'DELETE',
        url: `api/private/housing/10000`,
        failOnStatusCode: false,
      }).should((response) => {
        expect(response).property('status').to.equal(500);
      });
    });
  });

  describe('POST api/private/housing/assign', () => {
    it('valid request', function () {
      cy.request({
        method: 'PUT',
        url: `api/private/housing/assign`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: { refugee_id: 1, housing_id: 1 },
      }).should((response) => {
        expect(response).property('status').to.equal(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('success');
      });
    });

    it('invalid request', function () {
      cy.request({
        method: 'PUT',
        url: `api/private/housing/assign`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: { refugee_id: 1, housing_id: 10000 },
        failOnStatusCode: false,
      }).should((response) => {
        expect(response).property('status').to.equal(404);
        expect(response.body).to.have.property('message');
      });
    });
  });

  describe('GET api/private/employee', () => {
    it('valid request', function () {
      cy.request('api/private/employee').should((response) => {
        expect(response).property('status').to.equal(200);
        expect(response.headers['content-type']).to.equal('application/json; charset=utf-8');
      });
    });
  });

  describe('GET api/private/employee/:email', () => {
    it('valid request', function () {
      cy.request('api/private/employee/laura@afi.de').should((response) => {
        expect(response).property('status').to.equal(200);
        expect(response.headers['content-type']).to.equal('application/json; charset=utf-8');
      });
    });

    it('invalid request', function () {
      cy.request('api/private/employee/test@test.de').should((response) => {
        expect(response).property('status').to.equal(200);
        expect(response.headers['content-type']).to.equal('application/json; charset=utf-8');
        expect(response.body).to.have.length(0);
      });
    });
  });

  describe('POST api/private/donation/publish', () => {
    before(function () {
      cy.fixture('privateAPI/donation').then((donation) => {
        this.donation = donation;
      });
      cy.fixture('privateAPI/donationInvalid').then((donation) => {
        this.donationInvalid = donation;
      });
    });

    it('valid request', function () {
      cy.request({
        method: 'POST',
        url: `api/private/donation/publish`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: this.donation,
      }).should((response) => {
        expect(response).property('status').to.equal(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('success');
      });
    });

    it('invalid request', function () {
      cy.request({
        method: 'POST',
        url: `api/private/donation/publish`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: this.donationInvalid,
        failOnStatusCode: false,
      }).should((response) => {
        expect(response).property('status').to.equal(400);
        expect(response.body).to.have.property('message');
      });
    });
  });

  describe('POST api/private/aboutus/publish', () => {
    before(function () {
      cy.fixture('privateAPI/aboutus').then((aboutus) => {
        this.aboutus = aboutus;
      });
      cy.fixture('privateAPI/aboutusInvalid').then((aboutus) => {
        this.aboutusInvalid = aboutus;
      });
    });

    it('valid request', function () {
      cy.request({
        method: 'POST',
        url: `api/private/aboutus/publish`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: this.aboutus,
      }).should((response) => {
        expect(response).property('status').to.equal(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('success');
      });
    });

    it('invalid request', function () {
      cy.request({
        method: 'POST',
        url: `api/private/aboutus/publish`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: this.aboutusInvalid,
        failOnStatusCode: false,
      }).should((response) => {
        expect(response).property('status').to.equal(400);
        expect(response.body).to.have.property('message');
      });
    });
  });

  describe('POST api/private/aboutus/delete', () => {
    before(function () {
      cy.fixture('privateAPI/aboutusDelete').then((aboutus) => {
        this.aboutus = aboutus;
      });
      cy.fixture('privateAPI/aboutus').then((aboutus) => {
        this.aboutusInvalid = aboutus;
      });
    });

    it('valid request', function () {
      cy.request({
        method: 'POST',
        url: `api/private/aboutus/delete`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: this.aboutus,
      }).should((response) => {
        expect(response).property('status').to.equal(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('success');
      });
    });

    it('invalid request', function () {
      cy.request({
        method: 'POST',
        url: `api/private/aboutus/delete`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: this.aboutusInvalid,
        failOnStatusCode: false,
      }).should((response) => {
        expect(response).property('status').to.equal(400);
        expect(response.body).to.have.property('message');
      });
    });
  });
});
