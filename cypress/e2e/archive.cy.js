Cypress.Commands.add(
  'chooseDatePicker',
  (selector, value) => {
    cy.get('body')
      .then(($body) => {
        const mobilePickerSelector = `${selector} input[readonly]`;
        const isMobile = $body.find(mobilePickerSelector).length > 0;
        if (isMobile) {
          // The MobileDatePicker component has readonly inputs and needs to
          // be opened and clicked on edit so its inputs can be edited
          cy.get(mobilePickerSelector)
            .click();
          cy.get('[role="dialog"] [aria-label="calendar view is open, go to text input view"]')
            .click();
          cy.get(`[role="dialog"] ${selector}`)
            .find('input')
            .clear()
            .type(value);
          cy.contains('[role="dialog"] button', 'OK')
            .click();
        } else {
          cy.get(selector)
            .find('input')
            .clear()
            .type(value);
        }
      });
  },
);

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

  // it('Is able to select Start and End Date filter in mobile view', () => {
  //   cy.viewport(600, 982) 
  //   cy.contains('Filters').click()

  //   const datePickerValue = '01-01-2019';
  //   cy.chooseDatePicker('[data-cy="start-date-filter"]', datePickerValue);


  // })

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

    cy.contains('Clear All').click()

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

    cy.wait(2000)
    cy.viewport(400, 982) 
    cy.wait(2000)
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




})