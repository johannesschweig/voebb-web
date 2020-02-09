import utils from '../utils'

import { NEWEST, TITLE_A_Z, TITLE_Z_A } from '../../../src/renderer/utils/constants'

describe('Bookmarks', function () {
  // add fake bookmarks
  before(function () {
    // initialize with the first three fake bookmarks
    let identifiers = utils.books.slice(0, 3).map(b => b.identifier)
    let str = JSON.stringify(identifiers)
    utils.writeBookmarks(str)
  })
  before(utils.before)
  after(utils.after)
  // reset bookmarks
  after(function () {
    utils.writeBookmarks('[]')
  })

  this.timeout(0)
  it('renders loading indicator', function () {
    return this.app.client
      // switch to bookmarks
      .element('a[label="Bookmarks"]')
      .click()
      .waitForExist('#app > div:nth-child(2) > h1')
      // check loading placeholder
      .waitForExist('.sk-fading-circle')
      .element('span.placeholder')
      .getText()
      .then(text => {
        expect(text).to.equal('Fetching bookmarks')
      })
      // go back to search
      .element('a[label="Search"]')
      .click()
  })

  it('returns search results with correct bookmark status', function () {
    return this.app.client
      .element('//input')
      .click()
      .keys('goethe italien tagebuch\uE007')
      // first elements are bookmarked
      .waitForExist('.card:nth-child(1) svg.active')
      .waitForExist('.card:nth-child(2) svg.active')
      .waitForExist('.card:nth-child(3) svg.active')
      .waitForExist('.card:nth-child(4) svg:not(.active)')
  })

  it('sorts bookmarks correctly', function () {
    let newest = utils.books.slice(0, 3).sort((a, b) => b.year - a.year)[0].title
    let alphabetic = utils.books.slice(0, 3).sort((a, b) => a.title.localeCompare(b.title))
    let first = alphabetic[0].title
    let last = alphabetic.slice(-1)[0].title

    return this.app.client
      // switch to bookmarks
      .element('a[label="Bookmarks"]')
      .click()
      .waitForExist('#app > div:nth-child(2) > h1')
      // sort by newest
      .element('option[value="' + NEWEST + '"]')
      .click()
      // check first entry
      .element('.card:nth-child(1) .title')
      .getText()
      .then(text => {
        expect(text).to.satisfy(text => text.startsWith(newest))
      })
      // sort by title a-z
      .element('option[value="' + TITLE_A_Z + '"]')
      .click()
      // check first entry
      .element('.card:nth-child(1) .title')
      .getText()
      .then(text => {
        expect(text).to.satisfy(text => text.startsWith(first))
      })
      // sort by title z-a
      .element('option[value="' + TITLE_Z_A + '"]')
      .click()
      // check first entry
      .element('.card:nth-child(1) .title')
      .getText()
      .then(text => {
        expect(text).to.satisfy(text => text.startsWith(last))
      })
  })

  it('bookmarks can be removed', function () {
    return this.app.client
      // switch to search
      .element('a[label="Search"]')
      .click()
      .waitForExist('input')
      // unbookmark first card
      .element('.card:nth-child(1) svg.active')
      .click()
      .element('.card:nth-child(3) svg.active')
      .click()
      .waitForExist('.card:nth-child(1) svg:not(.active)')
      // switch to bookmarks
      .element('a[label="Bookmarks"]')
      .click()
      .waitForExist('#app > div:nth-child(2) > h1')
      // check first entry
      .element('#app > div:nth-child(2) > div > div.card.bookmarks > div > div.title')
      .getText()
      .then(text => {
        expect(text).to.satisfy(text => text.startsWith(utils.books[1].title))
      })
      // switch to preview
      .element('#app > div:nth-child(2) > div > div.card.bookmarks')
      .click()
      .waitForExist('div.grid')
      // unbookmark
      .element('#app > div:nth-child(2) > div > div:nth-child(1) > svg')
      .click()
      // go back to bookmarks page
      .element('#app > div:nth-child(2) > div > div:nth-child(1) > a:nth-child(1)')
      .click()
      .waitForExist('#app > .container:nth-child(2):not(.slide-right-leave-active) > span.placeholder')
      // placeholder should be displayed
      .element('.container > span.placeholder')
      .getText()
      .then(text => {
        expect(text.trim()).to.equal('You have not added any bookmarks yet.')
      })
  })

  it('bookmarks settings file gets updated', function () {
    return expect(utils.readBookmarks()).to.equal('[]')
  })
})
