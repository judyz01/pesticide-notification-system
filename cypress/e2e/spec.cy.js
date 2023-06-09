describe('Misc Testing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/')  
  });

  it('Is able to move sliders', () => {
    cy.get('[data-cy="demo-switch"]').click()

    cy.get('[data-cy=demo-slider]').within(() => {
      cy.get('span[data-index=1]').click({ multiple: true, force: true }).within(() => {
        cy.get('input[data-index=1]').realType('{rightarrow}{rightarrow}')
      })
    });

  })



})

