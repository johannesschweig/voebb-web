import utils from '../utils'
import { MOST_RELEVANT, NEWEST, TITLE_A_Z, TITLE_Z_A } from '../../../src/renderer/utils/constants'

// identifier of the bookmarked book
let bookmarkId

// extract first number with a trailing slash
function getNumberOfResults (text) {
  return parseInt(text.match(/^\d\d\//g)[0].slice(0, -1))
}

// extract last number with leading dash
function getYearFromSubtitle (text) {
  return parseInt(text.match(/[0-9]{4}$/g)[0])
}

describe('Search', function () {
  before(function () {
    // reset bookmarks
    utils.writeBookmarks('[]')
  })
  before(utils.before)
  after(utils.after)
  after(function () {
    // reset bookmarks
    utils.writeBookmarks('[]')
  })

  this.timeout(0)
  it('returns search results', function () {
    return this.app.client
      .element('//input')
      .click()
      .keys('sams taschenbier\uE007')
      // check loading placeholder
      .waitForExist('.sk-fading-circle')
      .element('span.placeholder')
      .getText()
      .then(text => {
        expect(text).to.equal('Searching for sams taschenbier')
      })
      // check results
      .waitForExist('.card')
      .elements('.card')
      .then(res => {
        expect(res.value).to.have.lengthOf.within(95, 110)
      })
  })

  it('sorts entries correctly', function () {
    let arr = []
    return this.app.client
      // sort by newest
      .element('option[value="' + NEWEST + '"]')
      .click()
      // TODO: reuse parts, reduce copy-paste
      .element('.card:nth-child(1) .subtitle')
      .getText()
      .then(text => {
        arr.push(getYearFromSubtitle(text))
      })
      .element('.card:nth-child(10) .subtitle')
      .getText()
      .then(text => {
        arr.push(getYearFromSubtitle(text))
      })
      .element('.card:nth-child(20) .subtitle')
      .getText()
      .then(text => {
        arr.push(getYearFromSubtitle(text))
        expect(arr).to.equal(arr.sort((a, b) => b - a))
      })
      // sort by title a-z
      .element('option[value="' + TITLE_A_Z + '"]')
      .click()
      .element('.card:nth-child(1) .title')
      .getText()
      .then(text => {
        arr.push(text)
      })
      .element('.card:nth-child(10) .title')
      .getText()
      .then(text => {
        arr.push(text)
      })
      .element('.card:nth-child(20) .title')
      .getText()
      .then(text => {
        arr.push(text)
        expect(arr).to.equal(arr.sort())
      })
      // sort by title z-a
      .element('option[value="' + TITLE_Z_A + '"]')
      .click()
      .element('.card:nth-child(1) .title')
      .getText()
      .then(text => {
        arr.push(text)
      })
      .element('.card:nth-child(10) .title')
      .getText()
      .then(text => {
        arr.push(text)
      })
      .element('.card:nth-child(20) .title')
      .getText()
      .then(text => {
        arr.push(text)
        expect(arr).to.equal(arr.sort().reverse())
      })
      // reset sorting
      .element('option[value="' + MOST_RELEVANT + '"]')
      .click()
  })

  it('filters entries correctly', function () {
    return this.app.client
      // books
      .element('option[value="Book"]')
      .click()
      // check number of results
      .element('.grid > span')
      .getText()
      .then(text => {
        expect(getNumberOfResults(text)).to.be.within(35, 45)
      })
      // movies
      .element('option[value="Movies"]')
      .click()
      // check number of results
      .element('.grid > span')
      .getText()
      .then(text => {
        expect(getNumberOfResults(text)).to.be.within(5, 15)
      })
      // check medium icon of first three elements
      .waitForExist('div:nth-child(1) > div > div.title > i.fa-film')
      .waitForExist('div:nth-child(2) > div > div.title > i.fa-film')
      .waitForExist('div:nth-child(3) > div > div.title > i.fa-film')
      // reset filter
      .element('option[value="All"]')
      .click()
  })

  it('displays preview', function () {
    return this.app.client
      // click third card
      .element('.card:nth-child(3)')
      .click()
      // check transition
      .waitForExist('#app > div.slide-left-leave-active:nth-child(2)')
      .waitForExist('#app > div.slide-left-enter-active:nth-child(3)')
      // wait for preview
      .waitForExist('a[href="#/SearchWrapper/Page"]')
      .element('h1')
      .getText()
      .then(text => {
        expect(text).to.equal('Ein Sams für Martin Taschenbier / Paul Maar')
      })
      // find id to check in settings file later
      .element('.grid > div > a:last-child')
      .getAttribute('href')
      .then(url => {
        bookmarkId = url.match(/AK[0-9]{8}/g)
      })
      // go back to search
      .element('a[label="Search"]')
      .click()
      // check transition
      .waitForExist('#app > div.slide-right-leave-active:nth-child(2)')
      .waitForExist('#app > div.slide-right-enter-active:nth-child(3)')
      // TODO check scrolling
  })

  it('bookmarking is possible', function () {
    return this.app.client
      // click bookmark
      // FIXME remove pause
      .pause(1500)
      .element('#app > div.root > div.container > div:nth-child(3) > svg')
      .click()
      .pause(10000)
      .waitForExist('#app > div.root > div.container > div:nth-child(3) > svg.active')
      // switch to bookmarks
      .element('a[label="Bookmarks"]')
      .click()
      .waitForExist('#app > div:nth-child(2) > h1')
      .element('.title')
      .getText()
      .then(text => {
        expect(text).to.equal('Ein Sams für Martin Taschenbier / Paul Maar (Band)')
      })
  })

  it('bookmarks settings file gets updated', function () {
    return expect(utils.readBookmarks()).to.equal('["' + bookmarkId + '"]')
  })
})
