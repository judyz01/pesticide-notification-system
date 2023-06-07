

describe('Home Page', () => {
  it('Is able to visit site', () => {
    cy.visit('http://localhost:3001/')
  })

  it('Is able to click Site Help button', () => {
    cy.visit('http://localhost:3001/')

    cy.contains('Site Help').click()
  })

  it('Is able to click search bar', () => {
    cy.visit('http://localhost:3001/')

    cy.contains('Enter Address').click()
  })

  it('Is able to click emergencytab', () => {
    cy.visit('http://localhost:3001/')
    cy.viewport(1512, 982) 
    cy.contains('Emergency').click()
  })

  it('Is able to visit archive', () => {
    cy.visit('http://localhost:3001/Archive')
    cy.viewport(600, 982) 
    cy.contains('Filters').click()
  })

  // As a user of both the web and mobile applications, I would like to be aware of the information being stored about my app usage (cookies).
  it('Is able to accept cookies', () => {
    cy.visit('http://localhost:3001/')
    cy.contains('I understand').click()
  })

  it('Is able to decline cookies', () => {
    cy.visit('http://localhost:3001/')
    cy.contains('I decline').click()
  })

  // As a Spanish user, I would like to be able to access application information in my native language to better understand what is presented.
  it('Is able to switch languages to Spanish', () => {
    cy.visit('http://localhost:3001/')
    cy.contains('Español').click()
  })

  it('Is able to switch languages between Spanish and English', () => {
    cy.visit('http://localhost:3001/')
    cy.contains('Español').click()
    cy.contains('English').click()
  })

  // As a user of the web and mobile application, I would like to be able to search for pesticide applications in a specific area using a search bar.
  it('Is able to switch languages between Spanish and English', () => {
    cy.visit('http://localhost:3001/')
    cy.contains('Enter Address').click().type('Stanislaus County{enter}')
  })

    // As a user of the web and mobile application, I would like easy and quick access to resources from the homepage in case of an emergency (i.e. pesticide exposure).
    it('Is able to visit resources', () => {
      cy.visit('http://localhost:3001/Resources')
      cy.contains('At Home').click()
      cy.contains('Leave the area immediately or call 911 if you feel too sick to drive.').click()
      

      cy.contains('At Work').click()

    })

    // As a concerned user, I would like to see testimonials from people in my community that can vouch for the usefulness of the application. 
    it('Is able to click community voices tab', () => {
      cy.visit('http://localhost:3001/')
      cy.viewport(1512, 982) 
      cy.contains('Community').click()
    })

    it('Is able to show menu icon for nav bar in mobile view', () => {
      cy.visit('http://localhost:3001/')
      cy.viewport(590, 982) 
      cy.get('[data-cy="menu-icon"]').click()
    })


})
