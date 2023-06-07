
describe('Home Page', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3001/')  
  });

  it('Is able to click Site Help button', () => {
    cy.contains('Site Help').click()
  })

  it('Is able to click search bar', () => {
    cy.contains('Enter Address').click()
  })

  it('Is able to click the Emergency Tab', () => {
    cy.viewport(1512, 982) 
    cy.contains('Emergency').click()
  })


  // As a user of both the web and mobile applications, I would like to be aware of the information being stored about my app usage (cookies).
  it('Is able to accept cookies', () => {
    cy.contains('I understand').click()
  })

  it('Is able to decline cookies', () => {
    cy.contains('I decline').click()
  })

  // As a Spanish user, I would like to be able to access application information in my native language to better understand what is presented.
  it('Is able to switch languages to Spanish', () => {
    cy.contains('Español').click()
  })


  it('Is able to switch languages between Spanish and English', () => {
    cy.contains('Español').click()
    cy.contains('English').click()
  })

  // As a user of the web and mobile application, I would like to be able to search for pesticide applications in a specific area using a search bar.
  it('Is able to switch languages between Spanish and English', () => {
    cy.contains('Enter Address').click().type('Stanislaus County{enter}')
    cy.wait(3000)
  })

  // As a concerned user, I would like to see testimonials from people in my community that can vouch for the usefulness of the application. 
  it('Is able to click community voices tab', () => {
    cy.viewport(1512, 982) 
    cy.contains('Community').click()
  })

  it('Is able to click qr icon', () => {
    cy.get('[data-cy="qr-icon"]').click()
  })

  it('Is able to print qr code', () => {
    cy.get('[data-cy="qr-icon"]').click()
    cy.get('[data-cy="print-qr"]').click()
  })

  it('Is able to copy qr code url', () => {
    cy.get('[data-cy="qr-icon"]').click()
    cy.get('[data-cy="share-qr"]').click()
    cy.wait(2600)
  })

  it('Is able to close qr dialog', () => {
    cy.get('[data-cy="qr-icon"]').click()
    cy.get('body').click(0,0);
  })

})

