export {};

describe('Refugee Status API', () => {
  describe('api/public/refugee/status', () => {
    it('GET valid status', () => {
      cy.request('api/public/refugee/123').should((response) => {
        expect(response).property('status').to.equal(200);
        expect(response.body).to.have.property('status');
        expect(response.body.status).to.equal(true);
      });
    });

    it('GET invalid status', () => {
      cy.request('api/public/refugee/1234').should((response) => {
        expect(response).property('status').to.equal(200);
        expect(response.body).to.have.property('status');
        expect(response.body.status).to.equal(false);
      });
    });
  });
});
