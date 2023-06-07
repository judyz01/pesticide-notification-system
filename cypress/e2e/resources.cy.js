describe('Resources Page', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3001/Resources')  
  });

  // As a user of the web and mobile application, I would like easy and quick access to resources from the homepage in case of an emergency (i.e. pesticide exposure).
  it('Is able to access the At Home accordian', () => {
    cy.contains('At Home').click()
  })

  it('Is able to deselect the accordian', () => {
    cy.contains('At Home').click()
    cy.contains('At Home').click()

  })

  it('Is able to access the At Work accordian', () => {
    cy.contains('At Work').click()
  })

  it('Is able check off all the checkboxes in the At Home accordian', () => {
    cy.contains('At Home').click()

    cy.get('[data-cy="checkbox-list-label-0"]').click()
    cy.get('[data-cy="checkbox-list-label-1"]').click()
    cy.get('[data-cy="checkbox-list-label-2"]').click()
    cy.get('[data-cy="checkbox-list-label-3"]').click()

  })

  it('Is able uncheck checkboxes in the At Home accordian', () => {
    cy.contains('At Home').click()

    cy.get('[data-cy="checkbox-list-label-0"]').click()
    cy.get('[data-cy="checkbox-list-label-1"]').click()
    cy.get('[data-cy="checkbox-list-label-2"]').click()
    cy.get('[data-cy="checkbox-list-label-3"]').click()

    cy.get('[data-cy="checkbox-list-label-3"]').click()
    cy.get('[data-cy="checkbox-list-label-2"]').click()
    cy.get('[data-cy="checkbox-list-label-1"]').click()
    cy.get('[data-cy="checkbox-list-label-0"]').click()
  })

  it('Is able to change languages to Español', () => {
    cy.contains('Español').click()
  })

})