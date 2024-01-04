/* eslint-disable cypress/no-force */
/* eslint-disable cypress/unsafe-to-chain-command */
/// <reference types='cypress' />

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/webtables');
  });
  // eslint-disable-next-line max-len
  it('should have pagination with 5,10,20,25,50,100 values in selector and equal number of rows', () => {
    // cy.get('.-pagination').should('have.select');

    cy.get('[aria-label="rows per page"]')
      .select('5 rows')
      .should('have.value', '5');

    cy.get('.rt-tr-group').should('have.length', 5);

    cy.get('[aria-label="rows per page"]')
      .select('10 rows')
      .should('have.value', '10');

    cy.get('.rt-tr-group').should('have.length', 10);

    cy.get('[aria-label="rows per page"]')
      .select('20 rows', { force: true })
      .invoke('show')
      .should('have.value', '20');

    cy.get('.rt-tr-group').should('have.length', 20);

    cy.get('[aria-label="rows per page"]')
      .select('25 rows', { force: true })
      .invoke('show')
      .should('have.value', '25');

    cy.get('.rt-tr-group').should('have.length', 25);

    cy.get('[aria-label="rows per page"]')
      .select('50 rows', { force: true })
      .invoke('show')
      .should('have.value', '50');

    cy.get('.rt-tr-group').should('have.length', 50);

    cy.get('[aria-label="rows per page"]')
      .select('100 rows', { force: true })
      .invoke('show')
      .should('have.value', '100');

    cy.get('.rt-tr-group').should('have.length', 100);
  });

  it('should have ability to add new worker', () => {
    cy.task('generateWorker').then((worker) => {
      cy.get('#addNewRecordButton').click();

      cy.findByPlaceholder('First Name').type(worker.firstName);
      cy.findByPlaceholder('Last Name').type(worker.lastName);
      cy.findByPlaceholder('name@example.com').type(worker.email);
      cy.findByPlaceholder('Age').type(worker.age);
      cy.findByPlaceholder('Salary').type(worker.salary);
      cy.findByPlaceholder('Department').type(worker.department);

      cy.get('#submit').click();

      cy.get(':nth-child(4) > .rt-tr > :nth-child(1)')
        .should('contain', worker.firstName);
      cy.get(':nth-child(4) > .rt-tr > :nth-child(2)')
        .should('contain', worker.lastName);
      // eslint-disable-next-line max-len
      cy.get(':nth-child(4) > .rt-tr > :nth-child(3)', { force: true })
        .should('contain', worker.age);
      cy.get(':nth-child(4) > .rt-tr > :nth-child(4)')
        .should('contain', worker.email);
      cy.get(':nth-child(4) > .rt-tr > :nth-child(5)')
        .should('contain', worker.salary);
      cy.get(':nth-child(4) > .rt-tr > :nth-child(6)')
        .should('contain', worker.department);
    });
  });

  it('should delete one worker and all workers in a table', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-1').should('not.exist');

    cy.get('#delete-record-2').click();
    cy.get('#delete-record-2').should('not.exist');

    cy.get('#delete-record-3').click();
    cy.get('#delete-record-3').should('not.exist');

    // action-buttons is missed when worker doesn't exist
    cy.get('.action-buttons').should('not.exist');
  });

  it('should find worker in the search field and edit it', () => {
    cy.task('generateWorker').then((worker) => {
      cy.get('#addNewRecordButton').click();

      cy.findByPlaceholder('First Name').type(worker.firstName);
      cy.findByPlaceholder('Last Name').type(worker.lastName);
      cy.findByPlaceholder('name@example.com').type(worker.email);
      cy.findByPlaceholder('Age').type(worker.age);
      cy.findByPlaceholder('Salary').type(worker.salary);
      cy.findByPlaceholder('Department').type(worker.department);

      cy.get('#submit').click();

      cy.findByPlaceholder('Type to search')
        .type(worker.firstName);
      cy.get('.input-group-append').click();

      cy.get('[title="Edit"]').click();
      cy.findByPlaceholder('First Name')
        .clear()
        .type('Edited');
      cy.get('#submit').click();

      cy.findByPlaceholder('Type to search').clear();

      cy.get('.rt-table')
        .should('contain', 'Edited');
      cy.get(':nth-child(4) > .rt-tr > :nth-child(2)')
        .should('contain', worker.lastName);
      // eslint-disable-next-line max-len
      cy.get(':nth-child(4) > .rt-tr > :nth-child(3)', { force: true })
        .should('contain', worker.age);
      cy.get(':nth-child(4) > .rt-tr > :nth-child(4)')
        .should('contain', worker.email);
      cy.get(':nth-child(4) > .rt-tr > :nth-child(5)')
        .should('contain', worker.salary);
      cy.get(':nth-child(4) > .rt-tr > :nth-child(6)')
        .should('contain', worker.department);
    });
  });

  it('should check the search by all column values', () => {
    cy.task('generateWorker').then((worker) => {
      cy.get('#addNewRecordButton').click();

      cy.findByPlaceholder('First Name').type(worker.firstName);
      cy.findByPlaceholder('Last Name').type(worker.lastName);
      cy.findByPlaceholder('name@example.com').type(worker.email);
      cy.findByPlaceholder('Age').type(worker.age);
      cy.findByPlaceholder('Salary').type(worker.salary);
      cy.findByPlaceholder('Department').type(worker.department);

      cy.get('#submit').click();

      cy.findByPlaceholder('Type to search')
        .type(worker.firstName);
      cy.get('.rt-table')
        .should('contain', worker.firstName);

      cy.findByPlaceholder('Type to search')
        .clear()
        .type(worker.lastName);
      cy.get('.rt-table')
        .should('contain', worker.lastName);

      cy.findByPlaceholder('Type to search')
        .clear()
        .type(worker.age);
      cy.get('.rt-table')
        .should('contain', worker.age);

      cy.findByPlaceholder('Type to search')
        .clear()
        .type(worker.salary);
      cy.get('.rt-table')
        .should('contain', worker.salary);

      cy.findByPlaceholder('Type to search')
        .clear()
        .type(worker.department);
      cy.get('.rt-table')
        .should('contain', worker.department);
    });
  });
});
