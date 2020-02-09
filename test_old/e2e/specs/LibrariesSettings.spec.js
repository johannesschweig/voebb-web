import utils from '../utils'

describe('LibrariesSettings', function () {
  const libraries = '["ZLB: Amerika-Gedenkbibliothek (AGB)","ZLB: Außenmagazin Amerika-Gedenkbibliothek","ZLB: Außenmagazin Berliner Stadtbibliothek","ZLB: Berliner Stadtbibliothek  (BStB)","Mitte: Bibliothek am Luisenbad"]'
  // add fake bookmarks
  before(function () {
    utils.writeLibraries(libraries)
  })
  before(utils.before)
  after(utils.after)
  // reset bookmarks
  after(function () {
    utils.writeLibraries(libraries)
  })

  this.timeout(0)
  it('removing libraries is possible', function () {
    return this.app.client
      // switch to settings
      .element('a[label="Settings"]')
      .click()
      // check saved checkbox
      .waitForExist('input.checked[value="Mitte: Bibliothek am Luisenbad"]')
      // untick
      .element('input.checked[value="Mitte: Bibliothek am Luisenbad"]')
      .click()
      // check unticked checkbox
      .waitForExist('input:not(.checked)[value="Mitte: Bibliothek am Luisenbad"]')
      // Time to write settings file to disk
      .pause(10)
  })

  it('libraries settings file gets updated', function () {
    return expect(utils.readLibraries()).to.equal('["ZLB: Amerika-Gedenkbibliothek (AGB)","ZLB: Außenmagazin Amerika-Gedenkbibliothek","ZLB: Außenmagazin Berliner Stadtbibliothek","ZLB: Berliner Stadtbibliothek  (BStB)"]')
  })
})
