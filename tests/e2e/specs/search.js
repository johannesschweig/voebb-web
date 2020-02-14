import { MOST_RELEVANT, NEWEST, TITLE_A_Z, TITLE_Z_A } from '../../../src/utils/constants'
import { startClean } from '../support/utils'
import { getUserData, setUserData } from '../../../src/utils/userStorage'
import accessToken from '../support/accessToken'

// identifier of the bookmarked book
let bookmarkId

// extract first number with a trailing slash
function getNumberOfResults (text) {
  return parseInt(text.trim().match(/^\d\d\//g)[0].slice(0, -1))
}

// extract last number with leading dash
function getYearFromSubtitle (text) {
  return parseInt(text.trim().match(/[0-9]{4}$/g)[0])
}

describe('Search', function () {
  before(function() {
    // clear bookmarks for failed tests
    setUserData('0', 'bookmarks', [], accessToken)
  })

  after(function() {
    // clear bookmarks again
    setUserData('0', 'bookmarks', [], accessToken)
  })

  it('returns search results', function () {
    startClean()    
    cy.get('.inputfield > input').type('sams taschenbier{enter}')
    // check loading placeholder
    cy.get('.sk-fading-circle')
    cy.get('span.placeholder').contains('Searching for sams taschenbier')
    // wait for search to end, then check results
    cy.wait(32000)
    cy.get('.container:nth-child(2)').find('.card').its('length').should('be.within', 95, 110)
  })

  it('sorts entries correctly', function () {
    let arr = []
    // sort by newest
    // check the first, 10th and 20thcy.get
    cy.get('div:nth-child(3) > select').select(NEWEST)
    // TODO: reuse parts, reduce copy-paste
    cy.get('.card:nth-child(1) .subtitle').invoke('text')
      .then(text => arr.push(getYearFromSubtitle(text)))
    cy.get('.card:nth-child(10) .subtitle').invoke('text')
      .then(text => arr.push(getYearFromSubtitle(text)))
    cy.get('.card:nth-child(20) .subtitle').invoke('text')
      .then(text => {
        arr.push(getYearFromSubtitle(text))
        expect(arr).to.equal(arr.sort((a, b) => b - a))
      })
    // sort by title a-z
    // check the first, 10th and 20thcy.get
    cy.get('div:nth-child(3) > select').select(TITLE_A_Z)
    cy.get('.card:nth-child(1) .title').invoke('text')
      .then(text => arr.push(text))
    cy.get('.card:nth-child(10) .title').invoke('text')
      .then(text => arr.push(text))
    cy.get('.card:nth-child(20) .title').invoke('text')
      .then(text => {
        arr.push(text)
        expect(arr).to.eql(arr.sort())
      })
    // sort by title a-z
    // check the first, 10th and 20thcy.get
    cy.get('div:nth-child(3) > select').select(TITLE_Z_A)
    cy.get('.card:nth-child(1) .title').invoke('text')
      .then(text => arr.push(text))
    cy.get('.card:nth-child(10) .title').invoke('text')
      .then(text => arr.push(text))
    cy.get('.card:nth-child(20) .title').invoke('text')
      .then(text => {
        arr.push(text)
        expect(arr).to.eql(arr.sort().reverse())
      })

    // reset sorting
    cy.get('div:nth-child(3) > select').select(MOST_RELEVANT)
  })

  it('filters entries correctly', function () {
    cy.get('div:nth-child(2) > select').select('Book')
    // check number of results
    cy.get('.grid > span').invoke('text')
      .then(text => expect(getNumberOfResults(text)).to.be.within(35, 45))
    // movies
    cy.get('div:nth-child(2) > select').select('Movies')
    // check number of results
    cy.get('.grid > span').invoke('text')
      .then(text => expect(getNumberOfResults(text)).to.be.within(5, 15))
    // check medium icon of first threecy.gets
    cy.get('div:nth-child(1) > div > div.title > i.fa-film')
    cy.get('div:nth-child(2) > div > div.title > i.fa-film')
    cy.get('div:nth-child(3) > div > div.title > i.fa-film')
    // reset filter
    cy.get('div:nth-child(2) > select').select('All')
  })

  it('displays preview', function () {
    // click third card
    cy.get('.card:nth-child(3)').click()
    // check transition
    cy.get('#app > div.slide-left-leave-active:nth-child(2)')
    cy.get('#app > div.slide-left-enter-active:nth-child(3)')
    // wait for preview
    cy.wait(12000)
    cy.get('a[href="#/SearchWrapper/Page"]')
    cy.get('h1').contains('Ein Sams für Martin Taschenbier / Paul Maar')
    // find id to check in settings file later
    cy.get('.grid > div > a:last-child').invoke('attr', 'href')
      .then(href => {
        bookmarkId = href.match(/AK[0-9]{8}/g)[0]
      })
    // go back to search
    cy.get('a[label="Search"]').click()
    // check transition
    cy.get('#app > div.slide-right-leave-active:nth-child(2)')
    cy.get('#app > div.slide-right-enter-active:nth-child(3)')
    // TODO check scrolling
  })

  it('bookmarking is possible', function () {
      // click bookmark
      cy.get('#app > div.root > div.container > div:nth-child(3) > svg').click()
      cy.wait(12000)
      cy.get('#app > div.root > div.container > div:nth-child(3) > svg.active')
      // switch to bookmarks
      cy.get('a[label="Bookmarks"]').click()
      cy.get('.title').contains('Ein Sams für Martin Taschenbier / Paul Maar (Band)')
  })

  it('bookmarks settings file gets updated', function () {
    getUserData('0', 'bookmarks', accessToken).then(text => expect(text).to.equal([ bookmarkId ]))
  })
})
