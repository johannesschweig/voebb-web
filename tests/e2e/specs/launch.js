import { startClean } from '../support/utils'

describe('Launch', function () {
  it('shows the proper website title', function () {
    startClean()
    cy.title().should('eq', 'voebb-web')
  })
})
