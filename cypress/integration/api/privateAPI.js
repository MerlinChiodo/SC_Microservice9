// RabbitMQ - Events
describe('Events RabbitMQ', () => {
  // // Event Register Refugee Tests
  // describe('Event Register Refugee', () => {
  //   describe('Valid Refugee Data for Event', () => {
  //     beforeEach(function () {
  //       cy.fixture('events/refugee').then((refugee) => {
  //         this.refugee = refugee;
  //       });
  //     });

  //     it('verify valid request', function () {
  //       cy.request({
  //         method: 'POST',
  //         url: `http://localhost:3000/api/private/refugee/register`,
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: this.refugee,
  //       })
  //         .its('status')
  //         .should('eq', 200);
  //     });
  //   });

  //   describe('Invalid Refugee Data for Event', () => {
  //     beforeEach(function () {
  //       cy.fixture('events/refugee').then((refugee) => {
  //         this.refugee = refugee;
  //       });
  //     });

  //     it('verify no date_of_birth attribute', function () {
  //       delete this.refugee.date_of_birth;
  //       cy.request({
  //         method: 'POST',
  //         url: `http://localhost:3000/api/private/refugee/register`,
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: this.refugee,
  //         failOnStatusCode: false,
  //       })
  //         .its('status')
  //         .should('eq', 400);
  //     });

  //     it('verify no email attribute', function () {
  //       delete this.refugee.email;
  //       cy.request({
  //         method: 'POST',
  //         url: `http://localhost:3000/api/private/refugee/register`,
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: this.refugee,
  //         failOnStatusCode: false,
  //       })
  //         .its('status')
  //         .should('eq', 400);
  //     });

  //     it('verify no fistname attribute', function () {
  //       delete this.refugee.firstname;
  //       cy.request({
  //         method: 'POST',
  //         url: `http://localhost:3000/api/private/refugee/register`,
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: this.refugee,
  //         failOnStatusCode: false,
  //       })
  //         .its('status')
  //         .should('eq', 400);
  //     });

  //     it('verify no lastname attribute', function () {
  //       delete this.refugee.lastname;
  //       cy.request({
  //         method: 'POST',
  //         url: `http://localhost:3000/api/private/refugee/register`,
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: this.refugee,
  //         failOnStatusCode: false,
  //       })
  //         .its('status')
  //         .should('eq', 400);
  //     });

  //     it('verify invalid date format', function () {
  //       this.refugee.date_of_birth = '01-01-1977';
  //       cy.request({
  //         method: 'POST',
  //         url: `http://localhost:3000/api/private/refugee/register`,
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: this.refugee,
  //         failOnStatusCode: false,
  //       })
  //         .its('status')
  //         .should('eq', 400);
  //     });

  //     it('verify invalid email format', function () {
  //       this.refugee.email = 'testtest.com';
  //       cy.request({
  //         method: 'POST',
  //         url: `http://localhost:3000/api/private/refugee/register`,
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: this.refugee,
  //         failOnStatusCode: false,
  //       })
  //         .its('status')
  //         .should('eq', 400);
  //     });

  //     it('verify invalid firstname format', function () {
  //       this.refugee.firstname = '';
  //       cy.request({
  //         method: 'POST',
  //         url: `http://localhost:3000/api/private/refugee/register`,
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: this.refugee,
  //         failOnStatusCode: false,
  //       })
  //         .its('status')
  //         .should('eq', 400);
  //     });

  //     it('verify invalid lastname format', function () {
  //       this.refugee.lastname = '';
  //       cy.request({
  //         method: 'POST',
  //         url: `http://localhost:3000/api/private/refugee/register`,
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: this.refugee,
  //         failOnStatusCode: false,
  //       })
  //         .its('status')
  //         .should('eq', 400);
  //     });
  //   });

  //   describe('Verify Wrong Method Types', () => {
  //     it('GET Method', () => {
  //       cy.request({
  //         method: 'GET',
  //         url: 'http://localhost:3000/api/private/refugee/register',
  //         failOnStatusCode: false,
  //       })
  //         .its('status')
  //         .should('eq', 405);
  //     });

  //     it('DELETE Method', () => {
  //       cy.request({
  //         method: 'DELETE',
  //         url: 'http://localhost:3000/api/private/refugee/register',
  //         failOnStatusCode: false,
  //       })
  //         .its('status')
  //         .should('eq', 405);
  //     });

  //     it('PUT Method', () => {
  //       cy.request({
  //         method: 'PUT',
  //         url: 'http://localhost:3000/api/private/refugee/register',
  //         failOnStatusCode: false,
  //       })
  //         .its('status')
  //         .should('eq', 405);
  //     });
  //   });
  // });

  //   // Event Register Refugee Family Tests
  //   describe('Event Register Refugee Family', () => {
  //     describe('Valid Refugee Family Data for Event', () => {
  //       beforeEach(function () {
  //         cy.fixture('events/refugeeFamily').then((refugeeFamily) => {
  //           this.refugeeFamily = refugeeFamily;
  //         });
  //       });

  //       it('verify valid request', function () {
  //         cy.request({
  //           method: 'POST',
  //           url: `http://localhost:3000/api/events/buergerbuero/family`,
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: this.refugeeFamily,
  //         })
  //           .its('status')
  //           .should('eq', 200);
  //       });
  //     });

  //     describe('Invalid Refugee Data for Event', () => {
  //       beforeEach(function () {
  //         cy.fixture('events/refugeeFamily').then((refugeeFamily) => {
  //           this.refugeeFamily = refugeeFamily;
  //         });
  //       });

  //       it('verify no attribute parents', function () {
  //         delete this.refugeeFamily.parents;
  //         cy.request({
  //           method: 'POST',
  //           url: `http://localhost:3000/api/events/buergerbuero/family`,
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: this.RefugeeFamily,
  //           failOnStatusCode: false,
  //         })
  //           .its('status')
  //           .should('eq', 400);
  //       });

  //       it('verify no attribute children', function () {
  //         delete this.refugeeFamily.children;
  //         cy.request({
  //           method: 'POST',
  //           url: `http://localhost:3000/api/events/buergerbuero/family`,
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: this.refugeeFamily,
  //           failOnStatusCode: false,
  //         })
  //           .its('status')
  //           .should('eq', 400);
  //       });

  //       it('verify invalid firstname format on parents', function () {
  //         this.refugeeFamily.parents[0].firstname = '';
  //         cy.request({
  //           method: 'POST',
  //           url: `http://localhost:3000/api/events/buergerbuero/family`,
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: this.refugeeFamily,
  //           failOnStatusCode: false,
  //         })
  //           .its('status')
  //           .should('eq', 400);
  //       });

  //       it('verify invalid firstname format on children', function () {
  //         this.refugeeFamily.children[0].firstname = '';
  //         cy.request({
  //           method: 'POST',
  //           url: `http://localhost:3000/api/events/buergerbuero/family`,
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: this.refugeeFamily,
  //           failOnStatusCode: false,
  //         })
  //           .its('status')
  //           .should('eq', 400);
  //       });

  //       it('verify invalid lastname format on parents', function () {
  //         this.refugeeFamily.parents[0].lastname = '';
  //         cy.request({
  //           method: 'POST',
  //           url: `http://localhost:3000/api/events/buergerbuero/family`,
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: this.refugeeFamily,
  //           failOnStatusCode: false,
  //         })
  //           .its('status')
  //           .should('eq', 400);
  //       });

  //       it('verify invalid lastname format on children', function () {
  //         this.refugeeFamily.children[0].lastname = '';
  //         cy.request({
  //           method: 'POST',
  //           url: `http://localhost:3000/api/events/buergerbuero/family`,
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: this.refugeeFamily,
  //           failOnStatusCode: false,
  //         })
  //           .its('status')
  //           .should('eq', 400);
  //       });
  //       it('verify invalid date format on parents', function () {
  //         this.refugeeFamily.parents[0].date_of_birth = '01-01-1977';
  //         cy.request({
  //           method: 'POST',
  //           url: `http://localhost:3000/api/events/buergerbuero/family`,
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: this.refugeeFamily,
  //           failOnStatusCode: false,
  //         })
  //           .its('status')
  //           .should('eq', 400);
  //       });

  //       it('verify invalid date format on children', function () {
  //         this.refugeeFamily.children[0].date_of_birth = '01-01-1977';
  //         cy.request({
  //           method: 'POST',
  //           url: `http://localhost:3000/api/events/buergerbuero/family`,
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: this.refugeeFamily,
  //           failOnStatusCode: false,
  //         })
  //           .its('status')
  //           .should('eq', 400);
  //       });

  //       it('verify invalid email format on parents', function () {
  //         this.refugeeFamily.parents[0].email = 'hellohello.de';
  //         cy.request({
  //           method: 'POST',
  //           url: `http://localhost:3000/api/events/buergerbuero/family`,
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: this.refugeeFamily,
  //           failOnStatusCode: false,
  //         })
  //           .its('status')
  //           .should('eq', 400);
  //       });

  //       it('verify invalid email format on children', function () {
  //         this.refugeeFamily.children[0].email = 'hellohello.de';
  //         cy.request({
  //           method: 'POST',
  //           url: `http://localhost:3000/api/events/buergerbuero/family`,
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: this.refugeeFamily,
  //           failOnStatusCode: false,
  //         })
  //           .its('status')
  //           .should('eq', 400);
  //       });
  //     });

  //     describe('Verify Wrong Method Types', () => {
  //       it('GET Method', () => {
  //         cy.request({
  //           method: 'GET',
  //           url: 'http://localhost:3000/api/events/buergerbuero/family',
  //           failOnStatusCode: false,
  //         })
  //           .its('status')
  //           .should('eq', 405);
  //       });

  //       it('DELETE Method', () => {
  //         cy.request({
  //           method: 'DELETE',
  //           url: 'http://localhost:3000/api/events/buergerbuero/family',
  //           failOnStatusCode: false,
  //         })
  //           .its('status')
  //           .should('eq', 405);
  //       });

  //       it('PUT Method', () => {
  //         cy.request({
  //           method: 'PUT',
  //           url: 'http://localhost:3000/api/events/buergerbuero/family',
  //           failOnStatusCode: false,
  //         })
  //           .its('status')
  //           .should('eq', 405);
  //       });
  //     });
  //   };

  // Event Notify Tax Office about Donation Tests
  describe('Event Notify Tax Office about Donation', () => {
    describe('Valid Donation Data for Event', () => {
      beforeEach(function () {
        cy.fixture('events/donation').then((donation) => {
          this.donation = donation;
        });
      });

      it('verify valid request', function () {
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/private/donation`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.donation,
        })
          .its('status')
          .should('eq', 200);
      });

      it('verify valid request should return json', function () {
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/private/donation`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.donation,
        })
          .its('headers')
          .its('content-type')
          .should('include', 'application/json');
      });

      it('verify valid request max amount 5000', function () {
        this.donation.amount = 5000.0;
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/private/donation`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.donation,
        })
          .its('status')
          .should('eq', 200);
      });

      it('verify valid request min amount 5', function () {
        this.donation.amount = 5.0;
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/private/donation`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.donation,
        })
          .its('status')
          .should('eq', 200);
      });

      it('verify valid request optional id_citizien attribute', function () {
        delete this.donation.citizen_id;
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/private/donation`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.donation,
        })
          .its('status')
          .should('eq', 200);
      });
    });

    describe('Invalid Donation Data for Event', () => {
      beforeEach(function () {
        cy.fixture('events/donation').then((donation) => {
          this.donation = donation;
        });
      });

      it('verify no amount attribute', function () {
        delete this.donation.amount;
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/private/donation`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.donation,
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 400);
      });

      it('verify invalid amount format', function () {
        this.donation.amount = '50.0';
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/private/donation`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.donation,
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 400);
      });

      it('verify invalid id_citizen format', function () {
        this.donation.citizen_id = 'testid';
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/private/donation`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.donation,
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 400);
      });

      it('verify invalid amount < 5', function () {
        this.donation.amount = 4.99;
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/private/donation`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.donation,
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 400);
      });

      it('verify invalid amount > 5000', function () {
        this.donation.amount = 5000.01;
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/private/donation`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.donation,
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
          url: 'http://localhost:3000/api/private/donation',
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 405);
      });

      it('DELETE Method', () => {
        cy.request({
          method: 'DELETE',
          url: 'http://localhost:3000/api/private/donation',
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 405);
      });

      it('PUT Method', () => {
        cy.request({
          method: 'PUT',
          url: 'http://localhost:3000/api/private/donation',
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 405);
      });
    });
  });

  // Event Kita Applications Tests
  describe('Event Notify Kita About Application', () => {
    describe('Valid Application Data for Event', () => {
      beforeEach(function () {
        cy.fixture('events/kita').then((kita) => {
          this.kita = kita;
        });
      });

      it('verify valid request status 200', function () {
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/private/kita`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.kita,
        })
          .its('status')
          .should('eq', 200);
      });

      it('verify valid request content type json', function () {
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/private/kita`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.kita,
        })
          .its('headers')
          .its('content-type')
          .should('include', 'application/json');
      });

      it('verify valid care_time >= 20', function () {
        this.kita.care_time = 20;
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/private/kita`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.kita,
        })
          .its('status')
          .should('eq', 200);
      });

      it('verify valid care_time <= 45', function () {
        this.kita.care_time = 45;
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/private/kita`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.kita,
        })
          .its('status')
          .should('eq', 200);
      });
    });

    describe('Invalid Kita Application Data for Event', () => {
      beforeEach(function () {
        cy.fixture('events/kita').then((kita) => {
          this.kita = kita;
        });
      });

      it('verify no care_time attribute', function () {
        delete this.kita.care_time;
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/private/kita`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.kita,
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 400);
      });

      it('verify no child attribute', function () {
        delete this.kita.child;
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/private/kita`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.kita,
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 400);
      });

      it('verify no parent attribute', function () {
        delete this.kita.parent;
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/private/kita`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.kita,
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 400);
      });

      it('verify invalid care_time format', function () {
        this.kita.care_time = '35';
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/private/kita`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.kita,
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 400);
      });

      it('verify invalid id_citizen format on child', function () {
        this.kita.child.citizen_id = 'testid';
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/private/kita`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.kita,
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 400);
      });

      it('verify invalid id_citizen format on parent', function () {
        this.kita.parent.citizen_id = 'testid';
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/private/kita`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.kita,
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 400);
      });

      it('verify invalid care_time < 20', function () {
        this.kita.care_time = 19;
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/private/kita`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.kita,
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 400);
      });

      it('verify invalid care_time > 45', function () {
        this.kita.care_time = 46;
        cy.request({
          method: 'POST',
          url: `http://localhost:3000/api/private/kita`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.kita,
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
          url: 'http://localhost:3000/api/private/kita',
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 405);
      });

      it('DELETE Method', () => {
        cy.request({
          method: 'DELETE',
          url: 'http://localhost:3000/api/private/kita',
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 405);
      });

      it('PUT Method', () => {
        cy.request({
          method: 'PUT',
          url: 'http://localhost:3000/api/private/kita',
          failOnStatusCode: false,
        })
          .its('status')
          .should('eq', 405);
      });
    });
  });

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
        delete this.post.picture;
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
        this.post.date = '20-04-2022T00:20:20:39';
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
