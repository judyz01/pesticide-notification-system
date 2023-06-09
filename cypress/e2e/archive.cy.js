Cypress.Commands.add('setDateField', (date, label) => {
  //open the datepicker dialog if is mobile
  cy.contains(label).siblings('div').click()
  
  cy.get('body').then(($body) => {
    if ($body.find('[role=dialog]').length) {
      cy.get('[data-testid=PenIcon]').click()
      cy.get('[role=dialog]').contains(label).type(date)
      cy.get('[role=dialog]').contains('Confirmar').click()
      return
    }
    cy.contains(label).siblings('div').type(date)
  })
})


describe('Archive Page', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3001/Archive')  
  });

  it('Is able to click Filters button in mobile view', () => {
    cy.viewport(600, 982) 
    cy.contains('Filters').click()
  })

  it('Is able to select multiple counties in mobile view', () => {
    cy.viewport(600, 982) 
    cy.contains('Filters').click()
    cy.get('[data-cy="county-filter"]').click()
    cy.contains('Alameda').click()
    cy.contains('Alpine').click()
    cy.contains('Yolo').click()
  })

  // it('Is able to deselect multiple counties in mobile view', () => {
  //   cy.viewport(600, 982) 
  //   cy.contains('Filters').click()
  //   cy.get('[data-cy="county-filter"]').click()
  //   cy.contains('Alameda').click()
  //   cy.contains('Alpine').click()
  //   cy.contains('Yolo').click()


  //   cy.get('body').click(0,0);
  //   cy.get('[data-cy="county-filter"]').click()

  //   cy.contains('Alameda').click()
  //   cy.contains('Yolo').click()
  // })

  it('Is able to select Order By filter in mobile view', () => {
    cy.viewport(600, 982) 
    cy.contains('Filters').click()
    cy.get('[data-cy="order-filter"]').click()
    cy.contains('Least Recent').click()

    cy.get('[data-cy="order-filter"]').click()
    cy.contains('Most Recent').click()

  })

  it('Is able to select Applicant Type filter in mobile view', () => {
    cy.viewport(600, 982) 
    cy.contains('Filters').click()
    cy.get('[data-cy="applicant-filter"]').click()
    cy.contains('Ground').click()

    cy.get('[data-cy="applicant-filter"]').click()
    cy.contains('Aerial').click()

    cy.get('[data-cy="applicant-filter"]').click()
    cy.contains('Aerial/Ground').click()

  })

  it('Is able to select Aerial applicant type and render the NOI Cards', () => {
    cy.viewport(600, 982) 

    cy.contains('Filters').click()
    cy.get('[data-cy="county-filter"]').click()
    cy.contains('Alameda').click()
    cy.get('body').click(0,0);

    cy.get('[data-cy="applicant-filter"]').click()
    cy.contains('Aerial').click()

    cy.get('body').type('{esc}');
    cy.wait(1000)

  })

  it('Is able to select Ground applicant type and render the NOI Cards', () => {
    cy.viewport(600, 982) 

    cy.contains('Filters').click()
    cy.get('[data-cy="county-filter"]').click()
    cy.contains('Alameda').click()
    cy.get('body').click(0,0);

    cy.get('[data-cy="applicant-filter"]').click()
    cy.contains('Ground').click()

    cy.get('body').type('{esc}');
    cy.wait(1000)

  })

  it('Is able to select Aerial/Ground applicant type and render the NOI Cards', () => {
    cy.viewport(600, 982) 

    cy.contains('Filters').click()
    cy.get('[data-cy="county-filter"]').click()
    cy.contains('Alameda').click()
    cy.get('body').click(0,0);

    cy.get('[data-cy="applicant-filter"]').click()
    cy.contains('Aerial/Ground').click()

    cy.get('body').type('{esc}');
    cy.wait(1000)

  })

  it('Is able to select Start and End Date filter in mobile view', () => {
    cy.viewport(600, 982) 

    cy.contains('Filters').click()
    cy.get('[data-cy="county-filter"]').click()
    cy.contains('Alameda').click()
    cy.get('body').click(0,0);


    const startDateValue = '01-01-2019';
    cy.setDateField(startDateValue, "Start Date")

    const endDateValue = '05-01-2019';
    cy.setDateField(endDateValue, "End Date")
  })

  it('Is able to clear all Filters', () => {
    cy.viewport(600, 982) 

    cy.contains('Filters').click()
    cy.get('[data-cy="county-filter"]').click()
    cy.contains('Alameda').click()
    cy.get('body').click(0,0);

    cy.get('[data-cy="order-filter"]').click()
    cy.contains('Least Recent').click()

    cy.get('[data-cy="applicant-filter"]').click()
    cy.contains('Ground').click()

    const startDateValue = '01-01-2019';
    cy.setDateField(startDateValue, "Start Date")

    const endDateValue = '05-01-2019';
    cy.setDateField(endDateValue, "End Date")

    cy.get('[data-cy="fumigant-filter"]').click()

    cy.contains('Clear All').click()

  })

  it('Is able to send request for NOIs with all filters', () => {
    cy.viewport(600, 982) 

    cy.contains('Filters').click()
    cy.get('[data-cy="county-filter"]').click()
    cy.contains('Yolo').click()
    cy.get('body').click(0,0);

    cy.get('[data-cy="order-filter"]').click()
    cy.contains('Least Recent').click()
    cy.get('body').click(0,0);


    cy.get('[data-cy="applicant-filter"]').click()
    cy.contains('Ground').click()
    cy.get('body').click(0,0);


    const startDateValue = '10-01-2019';
    cy.setDateField(startDateValue, "Start Date")

    const endDateValue = '12-01-2019';
    cy.setDateField(endDateValue, "End Date")

    cy.get('[data-cy="fumigant-filter"]').click()

    cy.get('body').type('{esc}');
  })

  it('Is able to click cards qr icon', () => {
    cy.viewport(1500, 982) 

    cy.contains('Filters').click()
    cy.get('[data-cy="county-filter"]').click()
    cy.contains('Alameda').click()
    cy.get('body').click(0,0)

    cy.get('[data-cy="card-content"]')
      .eq(1)
      .get('[data-cy="qr-icon"]')
      .eq(1)
      .click()
  })

  it('has responsive NOI Cards', () => {
    cy.viewport(1500, 982) 
    cy.contains('Filters').click()
    cy.get('[data-cy="county-filter"]').click()
    cy.contains('Alameda').click()
    cy.get('body').click(0,0)

    cy.wait(1000)
    cy.viewport(400, 982) 
    cy.wait(1000)
    cy.viewport(1100, 982) 
  })

  it('Is able to check fumigant filter', () => {
    cy.viewport(1500, 982) 

    cy.contains('Filters').click()
    cy.get('[data-cy="county-filter"]').click()
    cy.contains('Alameda').click()
    cy.get('body').click(0,0);

    cy.get('[data-cy="fumigant-filter"]').click()
    cy.wait(2600)
  })

  it('Is able to click qr icon', () => {
    cy.contains('Filters').click()
    cy.get('[data-cy="county-filter"]').click()
    cy.contains('Alameda').click()
    cy.get('body').click(0,0);
    cy.get('body').type('{esc}');
    cy.get('[data-cy="qr-icon"]').eq(1).click()
  })

  it('Is able to print qr code', () => {
    cy.contains('Filters').click()
    cy.get('[data-cy="county-filter"]').click()
    cy.contains('Alameda').click()
    cy.get('body').click(0,0);
    cy.get('body').type('{esc}');
    cy.get('[data-cy="qr-icon"]').eq(1).click()
    cy.get('[data-cy="print-qr"]').click()
  })

  it('Is able to copy qr code url', () => {
    cy.contains('Filters').click()
    cy.get('[data-cy="county-filter"]').click()
    cy.contains('Alameda').click()
    cy.get('body').click(0,0);
    cy.get('body').type('{esc}');

    cy.once('uncaught:exception', () => false);
    cy.get('[data-cy="qr-icon"]').eq(1).click()
    cy.get('[data-cy="share-qr"]').click()
    cy.wait(2600)
  })

  it('Is able to close qr dialog', () => {
    cy.contains('Filters').click()
    cy.get('[data-cy="county-filter"]').click()
    cy.contains('Alameda').click()
    cy.get('body').click(0,0);
    cy.get('body').type('{esc}');
    cy.get('[data-cy="qr-icon"]').eq(1).click()
    cy.get('body').click(0,0);
  })

  it('Is able use pagination', () => {
    cy.viewport(1500, 982) 

    cy.contains('Filters').click()
    cy.get('[data-cy="county-filter"]').click()
    cy.contains('Alameda').click()
    cy.get('body').click(0,0);

    cy.get('[data-cy="pagination"]').scrollIntoView()

    cy.get('[data-cy="pagination"]').click()

    
  })




})