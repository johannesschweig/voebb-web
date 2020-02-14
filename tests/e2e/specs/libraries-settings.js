import { startClean } from '../support/utils'
import accessToken from '../support/accessToken'
import { getUserData, setUserData } from '../../../src/utils/userStorage'

const libraries = ['ZLB: Amerika-Gedenkbibliothek (AGB)','ZLB: Außenmagazin Amerika-Gedenkbibliothek','ZLB: Außenmagazin Berliner Stadtbibliothek','ZLB: Berliner Stadtbibliothek  (BStB)','Mitte: Bibliothek am Luisenbad']

describe('LibrariesSettings', function () {
  before(function() {
    // init with fake libraries
    setUserData('0', 'libraries', libraries, accessToken)
  })

  after(function() {
    // clear libraries again
    setUserData('0', 'libraries', [], accessToken)
  })

  it('removing libraries is possible', function () {
    startClean()
    cy.wait(1000)
    // libraries stored?
    // cy.wrap(null).then(() => {
    //   return getUserData('0', 'libraries', accessToken)
    //     .then(libs => expect(libs).to.eql(libraries))
    // })
    // switch to settings
    cy.get('a[label="Settings"]').click()
    // check saved checkbox
    // untick
    cy.get('input.checked[value="Mitte: Bibliothek am Luisenbad"]').click()
    // check unticked checkbox
    cy.get('input:not(.checked)[value="Mitte: Bibliothek am Luisenbad"]')
  })

  it('libraries settings file gets updated', function () {
    cy.wait(1000)
    cy.wrap(null).then(() => {
      return getUserData('0', 'libraries', accessToken)
        .then(libs => expect(libs).to.eql(["ZLB: Amerika-Gedenkbibliothek (AGB)","ZLB: Außenmagazin Amerika-Gedenkbibliothek","ZLB: Außenmagazin Berliner Stadtbibliothek","ZLB: Berliner Stadtbibliothek  (BStB)"]))
    })
  })
})
