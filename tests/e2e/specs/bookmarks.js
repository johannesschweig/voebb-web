import { NEWEST, TITLE_A_Z, TITLE_Z_A } from '../../../src/utils/constants'
import { books, startClean } from '../support/utils'
import accessToken from '../support/accessToken'
import { getUserData, setUserData } from '../../../src/utils/userStorage'

describe('Bookmarks', function () {
  before(function () {
    // initialize with the first three fake bookmarks
    let identifiers = books.slice(0, 3).map(b => b.identifier)
    setUserData('0', 'bookmarks', identifiers, accessToken)
  })

  after(function () {
    // reset bookmarks
    setUserData('0', 'bookmarks', [], accessToken)
  })

  it('renders loading indicator', function () {
    startClean()
    cy.wait(1000)
    // switch to bookmarks
    cy.get('a[label="Bookmarks"]').click()
    cy.get('#app > div:nth-child(2) > h1')
    // check loading placeholder
    cy.get('.sk-fading-circle')
    cy.get('span.placeholder').contains('Fetching bookmarks')
  })

  it('returns search results with correct bookmark status', function () {
    // go back to search
    cy.get('a[label="Search"]').click()
    cy.get('.inputfield > input').type('goethe italien tagebuch{enter}')
    cy.wait(8000)
    // first elements are bookmarked
    cy.get('.card:nth-child(1) svg.active')
    cy.get('.card:nth-child(2) svg.active')
    cy.get('.card:nth-child(3) svg.active')
    cy.get('.card:nth-child(4) svg:not(.active)')
  })

  it('sorts bookmarks correctly', function () {
    let newest = books.slice(0, 3).sort((a, b) => b.year - a.year)[0].title
    let alphabetic = books.slice(0, 3).sort((a, b) => a.title.localeCompare(b.title))
    let first = alphabetic[0].title
    let last = alphabetic.slice(-1)[0].title

    // switch to bookmarks
    cy.get('a[label="Bookmarks"]').click()
    cy.get('#app > div:nth-child(2) > h1')
    // sort by newest
    cy.get('select').select(NEWEST)
    // check first entry
    cy.get('.card:nth-child(1) .title').contains(newest)
    // sort by title a-z
    cy.get('select').select(TITLE_A_Z)
    // check first entry
    cy.get('.card:nth-child(1) .title').contains(first)
    // sort by title z-a
    cy.get('select').select(TITLE_Z_A)
    // check first entry
    cy.get('.card:nth-child(1) .title').contains(last)
  })

  it('bookmarks can be removed', function () {
    // switch to search
    cy.get('a[label="Search"]').click()
    // unbookmark first and third card
    cy.get('.card:nth-child(1) svg.active').click()
    cy.get('.card:nth-child(3) svg.active').click()
    cy.get('.card:nth-child(1) svg:not(.active)')
    // switch to bookmarks
    cy.get('a[label="Bookmarks"]').click()
    cy.get('#app > div:nth-child(2) > h1')
    // check first entry
    cy.get('#app > div:nth-child(2) > div > div.card.bookmarks > div > div.title').contains(books[1].title)
    // switch to preview
    cy.get('#app > div:nth-child(2) > div > div.card.bookmarks').click()
    cy.wait(6000)
    cy.get('div.grid')
    // unbookmark
    cy.get('#app > div:nth-child(2) > div > div:nth-child(1) > svg').click()
    // go back to bookmarks page
    cy.get('#app > div:nth-child(2) > div > div:nth-child(1) > a:nth-child(1)').click()
    cy.get('#app > .container:nth-child(2):not(.slide-right-leave-active) > span.placeholder')
    // placeholder should be displayed
    cy.get('.container > span.placeholder').contains('You have not added any bookmarks yet.')
  })

  it('bookmarks settings file gets updated', function () {
    getUserData('0', 'bookmarks', accessToken).then(text => expect(text).to.equal([]))
  })
})
