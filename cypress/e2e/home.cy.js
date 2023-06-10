
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

  // As a user of both the web and mobile applications, I would like to be aware of the information being stored about my app usage (cookies).
  it('Is able to accept cookies', () => {
    cy.contains('I understand').click()
  })

  it('Is able to decline cookies', () => {
    cy.contains('I decline').click()
    cy.on('window:alert',(t)=>{
      expect(t).to.contains('This may impact your ability to use the tool!');
    })

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
    cy.wait(5000)
  })

  // As a concerned user, I would like to see testimonials from people in my community that can vouch for the usefulness of the application. 
  it('Is able to click community voices tab', () => {
    cy.viewport(1512, 982) 
    cy.contains('Community').click()
  })

  it('Is able to click the Emergency Tab', () => {
    cy.viewport(1512, 982) 
    cy.contains('Emergency').click()
  })

  it('Is able to switch between the Emergency Tab and Community Voices Tab', () => {
    cy.viewport(1512, 982) 
    cy.contains('Emergency').click()
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
    cy.once('uncaught:exception', () => false)
    cy.get('[data-cy="qr-icon"]').click()
    cy.get('[data-cy="share-qr"]').click()
    cy.wait(2600)
  })

  it('Is able to close qr dialog', () => {
    cy.get('[data-cy="qr-icon"]').click()
    cy.get('body').click(0,0);
  })

  it('Is able to show menu icon for nav bar in mobile view', () => {
    cy.viewport(590, 982) 
    cy.get('[data-cy="menu-icon"]').click()
  })

  it('Is able to update menu icon for nav bar in mobile/desktop view', () => {
    cy.viewport(590, 982) 
    cy.viewport(1512, 982) 

  })

  it('Is able to choose between different radii', () => {
    cy.get('[data-cy="radius-filter"]').click()
    cy.contains('10 mi.').click()

  })

  it('Is able to choose between closest and furthest', () => {
    cy.get('[data-cy="order-distance-filter"]').click()
    cy.contains('Furthest').click()
  })

})

describe('Map', () => {
  it('Is able to show specific location when QR code is scanned', () => {
    cy.visit('http://localhost:3001/?lat=38.67119136846741&lng=-121.84941544524665')  
  })

  it('Is able to pan to current location', () => {
    cy.visit('http://localhost:3001/?lat=38.67119136846741&lng=-121.84941544524665')  
    cy.get('[data-cy="location-icon"]').click()
    cy.wait(5000)


  })
})

describe('Demo', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/')  
  });

  it('Is able to toggle the demo switch', () => {
    cy.get('[data-cy="demo-switch"]').click()
    cy.get('[data-cy="demo-switch"]').click()

  })

  it('Is able to move demo sliders', () => {
    cy.get('[data-cy="demo-switch"]').click()

    cy.get('[data-cy=demo-slider]').within(() => {
      cy.get('span[data-index=1]').click({ multiple: true, force: true }).within(() => {
        cy.get('input[data-index=1]').realType('{rightarrow}{rightarrow}')
      })
    });
  })
})