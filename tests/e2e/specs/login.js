import accessToken from '../support/accessToken'

describe('Login', function () {
  it('shows success message on login', function () {
    cy.visit('/')
    cy.get('a[label="Login"]').click()
    // check absence of message
    cy.get('p.success').should('not.exist')
    cy.get('p.failure').should('not.exist')
    // login 
    cy.get('input').type(`0${accessToken}`)
    cy.get('button').click()
    cy.get('p.success')
    cy.get('p.failure').should('not.exist')
  })
  it('shows success message on login', function () {
    cy.get('input').clear().type(`foo{enter}`)
    cy.get('p.failure')
    cy.get('p.success').should('not.exist')
  })
})
