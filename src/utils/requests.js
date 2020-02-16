import { landingPageOptions, searchPageOptions, singleSearchPageOptions, resultPageOptions, nextPageOptions } from './requestOptions'
import { detailsBlacklist, NO_HITS } from './constants'
import { getAvailability, checkEndOfSession, checkPagesVsResults, getSession, getService } from './string'
var rp = require('request-promise-native')
const $ = require('cheerio')
var fs = require('fs')
var path = require('path')

var session
var service
var searchTerm

// returns number of pages from search results page
// each page holds 22 entries
export function getNumberOfPages (html) {
  let hits = $('#R06', html).text().trim()
  hits = hits.substr(hits.indexOf('Treffer'))
  // extract number with regex
  hits = parseInt(hits.match(/\d+/)[0])
  return Math.ceil(hits / 22)
}

// extracts all the fields from a single result row
function extractFields (row) {
  // image cover (if any)
  let img = $('.img-delayed', row).attr('data-src')
  // medium (CD, Buch,...)
  let medium = $('.rList_medium > img', row).attr('title')
  // title
  let title = $('.rList_titel > a', row).text()
  // identifier, e.g. javascript:htmlOnLink('AK15216034')
  let identifier = $('.rList_titel > a', row).attr('href')
  identifier = identifier.match(/'([^']+)'/)[1]
  // name
  let name = $('.rList_name:nth-child(2)', row).text()
  // year
  let year = $('.rList_jahr', row).text()
  if (year === '' || year.length === 1) {
    year = 0
  } else {
    year = parseInt(year)
  }
  return {
    'title': title,
    'name': name,
    'medium': medium,
    'year': year,
    'img': img,
    'identifier': identifier
  }
}

// extracts the results from the html
function extractResult (html) {
  let data = []
  var rows = $('.rList > li', html)
  for (let i = 0; i < rows.length; i++) {
    data.push(extractFields(rows[i]))
  }
  return data
}

// search for a searchTerm
// mocked: if the search should return fake/mocked result
export function search (term, mocked = false) {
  searchTerm = term

  if (!mocked) {
    // open landing page
    return rp(landingPageOptions)
      .then(html => {
        // retrieve session from landing page
        session = getSession(html)
        service = getService(html)
        console.log('Session/service', session, service)
        // open search results page with search term
        return rp(searchPageOptions(session, service, searchTerm))
      }).then(async (html) => {
        checkEndOfSession(html, 'searchPageOptions')
        // check for no hits
        if (html.includes('Ihre Suche in allen Suchbereichen war erfolglos. Bitte verändern Sie Ihre Suchanfrage')) {
          console.log('No hits for', term)
          return NO_HITS
        }
        
        // extract results from html
        let pages = getNumberOfPages(html)
        // extract results from subsequent pages
        // there is only one page
        let results = extractResult(html)
        if (pages === 1) {
          console.log('ResultsPage successfull:', results.length, 'results')
          return Promise.resolve(results)
        } else {
          service = getService(html)
          console.log('Service', service)
          for (let i = 1; i < pages; i++) {
            let html = await rp(nextPageOptions(session, service, i))
            results = results.concat(extractResult(html))
          }
          checkPagesVsResults(pages, results.length)
          console.log('ResultsPage successfull:', results.length, 'results')
          return results
        }
      })
      .catch((err) => {
        console.log(err)
      })
  } else {
    // reads a mocked html file and extracts the data
    var html = fs.readFileSync(path.join(__dirname, '..', '..', 'tests', 'mocks', `${term}.html`), { encoding: 'utf8' })
    return extractResult(html)
  }
}

// extracts the attributes of a copy from an html row
// row: html row
// header: order of the columns
function extractCopy (row, header) {
  // library
  let library = $('td:nth-of-type(' + header[0] + ') a', row).text().trim()
  // if there is no a link
  if (!library) {
    library = $('td:nth-of-type(' + header[0] + ')', row).text().trim()
  }
  // place
  let place = $('td:nth-of-type(' + header[1] + ')', row).text().trim()
  // signature
  let signature = $('td:nth-of-type(' + header[2] + ')', row).text().trim()
  // orderStatus
  let orderStatus = $('td:nth-of-type(' + header[3] + ')', row).text().trim()
  // status text
  let statusText = $('td:nth-of-type(' + header[4] + ') > span', row).text().trim()
  // if the available class is set
  let avail = $('td:nth-of-type(' + header[4] + ') > span', row).attr('class') === 'available'
  return {
    'library': library,
    'place': place,
    'signature': signature,
    'orderStatus': orderStatus,
    'status': statusText,
    'availability': getAvailability(statusText, avail)
  }
}

// extracts the details from an entry html
function extractEntryDetails (html) {
  // extract details
  let details = {}
  let rows = $('.gi tr', html)
  for (let i = 0; i < rows.length; i++) {
    let left = $('.spaltelinks', rows[i]).text().trim()
    let right = $('.spalterechts', rows[i]).text().trim()
    if (right[0] === '[' && right.slice(-1) === ']') {
      right = right.slice(1, -1)
    }
    // blacklist of unnecessary tags
    if (!detailsBlacklist.includes(left)) {
      details[left] = right
    }
  }
  // extract image
  let img = $('#R001 img', html).attr('src')
  // check for rating image
  if (img && img.indexOf('Sterne.gif') === -1) {
    details.img = `https://voebb.de${img}`
  } else {
    img = ''
  }

  // extract all copies
  var copies = []
  // check presence and order of columns
  let header = [0, 0, 0, 0, 0]
  for (let i = 1; i <= $('th[scope="col"]', html).length; i++) {
    switch ($('th[scope="col"]:nth-child(' + i + ')', html).text()) {
      case 'Bibliothek': header[0] = i
        break
      case 'Standort': header[1] = i
        break
      case 'Signatur': header[2] = i
        break
      case 'Bestellmöglichkeit': header[3] = i
        break
      case 'Verfügbarkeit': header[4] = i
        break
    }
  }
  rows = $('#R08 tbody tr', html)
  for (let i = 0; i < rows.length; i++) {
    copies.push(extractCopy(rows[i], header))
  }
  return {
    'details': details,
    'copies': copies
  }
}

// returns the details for an entry
// mocked: if the search should return fake/mocked result
export function getEntryDetails (identifier, mocked = false) {
  if (!mocked) {
    return rp(singleSearchPageOptions(identifier))
      .then(html => {
        // retrieve session from result page
        session = getSession(html)
        service = getService(html)
        console.log('Session/service', session, service)
        return rp(resultPageOptions(session, service))
      }).then(html => {
        checkEndOfSession(html, 'resultPageOptions')
        let results = extractEntryDetails(html)
        results.identifier = identifier
        return results
      })
  } else {
    // reads a prepared html file and extracts the data
    let html = fs.readFileSync(path.join(__dirname, '..', '..', 'tests', 'mocks', `${identifier}.html`), { encoding: 'utf8' })
    let results = extractEntryDetails(html)
    results.identifier = identifier
    return results
  }
}
