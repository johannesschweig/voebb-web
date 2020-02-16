describe('Launch', function () {
  it('shows the proper website title', function () {
    cy.visit('/')
    cy.title().should('eq', 'voebb-web')
  })
})
