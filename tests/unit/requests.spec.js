import { getEntryDetails, search, getNumberOfPages } from '@/utils/requests'
import { getSession } from '@/utils/string'
var fs = require('fs')
var path = require('path')

// properties of results
const props = ['title', 'name', 'medium', 'year', 'img', 'identifier']

describe('requests.js', () => {
  it('retrieves details data for entry', () => {
    let res = getEntryDetails('AK34211530', true)

    expect(Object.prototype.hasOwnProperty.call(res, 'details')).toBeTruthy()
    expect(Object.prototype.hasOwnProperty.call(res, 'identifier')).toBeTruthy()
    expect(Object.prototype.hasOwnProperty.call(res, 'copies')).toBeTruthy()
    expect(res.details['Titel']).toBeTruthy()
    expect(res.details['Verfasser']).toBeTruthy()
  })

  it('returns search results for search term', () => {
    let res = search('SearchResultsPageRegular', true)

    // returns search results
    expect(res.length > 0).toBeTruthy()
    // search results have correct format
    res.forEach(e => {
      props.forEach(p => {
        expect(Object.prototype.hasOwnProperty.call(e, p)).toBeTruthy()
      })
    })
  })

  it('returns empty search if no results', () => {
    let res = search('SearchResultsPageNoResults', true)

    // returns search results
    expect(res).toEqual([])
  })

  it('returns correct number of pages', () => {
    let html = fs.readFileSync(path.join(__dirname, '..', 'mocks', 'SearchResultsPageRegular.html'), { encoding: 'utf8' })
    let html2 = '<div id="R06">unau, Treffer: 89 im Bibliothe</div>'
    let html3 = '<div id="R06">unau, Treffer: 13289 im Bibliothe</div>'
    let html4 = '<div id="R06">unau, Treffer: 66 im Bibliothe</div>'

    expect(getNumberOfPages(html)).toEqual(2)
    expect(getNumberOfPages(html2)).toEqual(5)
    expect(getNumberOfPages(html3)).toEqual(605)
    expect(getNumberOfPages(html4)).toEqual(3)
  })

  it('extracts session from html', () => {
    // session: 32 character string with uppercase letters and digits
    let session = '5DE6BE2E823D61961B8400645D9B1261'
    let html = `= "/aDISWeb/app;jsessionid=${session}.node1?service`
    let html2 = `= "/aDISWeb/app;jsessionid=${session}?service`
    expect(getSession(html)).toEqual(session)
    expect(getSession(html2)).toEqual(session)
  })
})
