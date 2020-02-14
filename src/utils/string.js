import { statusMapping, mediumFilter, ALL } from './constants'

// returns the current date string dd.mm.yyyy hh:mm
export function getCurrentDateString () {
  let date = new Date()
  let dateString = date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0')
  return dateString
}

// returns a shorter version of the library name
export function shortenLibraryName (library) {
  let lib = library
  let colon = lib.indexOf(':')
  // remove everything after colon if any
  if (colon !== -1) {
    lib = lib.substring(colon + 2)
  }
  // remove everything after opening bracket
  let bracket = lib.indexOf('(')
  if (bracket !== -1) {
    lib = lib.substring(0, bracket - 1)
  }
  lib = lib.replace('Bibl.', 'Bibliothek')
  lib = lib.replace('Ju.bibl.', 'Jugendbibliothek')
  return lib
}

// sanitizes details, removes unncessary content
// key: key of the content
// value: value of the content
// returns a sanitized value
export function sanitizeDetail (key, value) {
  switch (key) {
    // remove dashes from isbn
    case 'ISBN': return value.replace(/-/g, '')
    // remove everything after special character
    case 'Titel': {
      // remove numbers in brackets in the middle of the string, e.g. foo [412] bar
      value = value.replace(/ \[\d+\]/, '')
      let specialChars = [';', '[', '(']
      let stop = []
      // find earliest stopping special character
      specialChars.forEach(char => {
        if (value.indexOf(char) !== -1) {
          stop.push(value.indexOf(char))
        }
      })
      // shorten string
      if (stop.length === 0) {
        return value
      } else {
        return value.slice(0, Math.min(...stop))
      }
    }
    default: return value
  }
}

// computes the days due until the book is available from a string ("Ausgeliehen -  Fällig am: 27.11.2019")
export function getDaysDue (avail) {
  if (avail.indexOf(':') === -1) {
    console.log('Days due cannot be computed for', avail)
    return -99
  }
  let start = avail.indexOf(':') + 2
  let date
  // no additional statement
  let addStatement = avail.slice(start).indexOf(' - ')
  if (addStatement === -1) {
    date = avail.substr(start)
  } else {
    date = avail.substr(start, addStatement)
  }
  let parts = date.split('.')
  let date2 = new Date(parts[2] + '-' + parts[1].padStart(2, '0') + '-' + parts[0].padStart(2, '0'))
  if (isNaN(date2)) {
    console.log('Days due cannot be computed for', avail)
    return -99
  }
  let now = new Date()
  // getTimezoneOffset(): -120
  now = new Date(now.getTime() - now.getTimezoneOffset() * 60 * 1000)
  now.setUTCHours(0, 0, 0, 0)
  return Math.round(date2.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)
}

// adds availability to results
export function addAvailability (results, preferredLibraries) {
  return results.map(result => {
    // consider only copies from preferred libraries
    let copies = result.copies.filter(obj => preferredLibraries.includes(obj.library))

    return {
      ...result,
      availability: getCondensedAvailability(copies)
    }
  })
}

// returns an availability object for multiple copies ('available', 'x more days')
export function getCondensedAvailability (copies) {
  // empty array
  if (!copies.length) {
    return { days: Number.MAX_SAFE_INTEGER, message: 'not available' }
  }
  return copies.sort((a, b) => a.availability.days - b.availability.days)[0].availability
}

// returns a days and message object for a copy's status
export function getAvailability (text, available) {
  text = text.toLowerCase()
  if (available) {
    return {
      days: -Number.MAX_SAFE_INTEGER,
      message: 'available'
    }
  }
  // map status for non-available stati without date
  for (let i = 0; i < statusMapping.length; i++) {
    if (statusMapping[i].text.includes(text)) {
      return {
        days: Number.MAX_SAFE_INTEGER,
        message: statusMapping[i].message
      }
    }
  }

  let days = getDaysDue(text)
  return {
    days,
    message: days < 0 ? `${-days} days overdue` : `${days} days left`
  }
}

// extracts a year out of a string and returns it as an integer
// returns 0 if no year found or empty string
export function extractYear (str) {
  if (str === '') {
    return 0
  }
  // extract 4 digit year
  let year = str.match(/\b(19|20)\d{2}\b/gm)
  if (year && year.length) {
    return parseInt(year[0])
  } else {
    return 0
  }
}

// calculates the recommended width for the select box according to the lengths of its labels
export function calculateWidth (arr) {
  let len = arr.map(obj => obj.length)
  let w = Math.round(Math.max(...len) * 6.7 + 26)
  return {
    width: w + 'px'
  }
}

// returns an array of filters applicable for the current search data (media)
export function getMediaFilter (media) {
  // filter to applicable filters
  // count number of hits in results
  let filter = mediumFilter.map(obj => ({ ...obj, num: 0 }))
  for (let i = 0; i < media.length; i++) {
    for (let j = 0; j < filter.length; j++) {
      // medium filter matches current medium
      if (filter[j].text.indexOf(media[i]) !== -1) {
        filter[j].num += 1
        break
      }
    }
  }
  // remove filters without hits
  filter = filter.filter(obj => obj.num > 0)
  // sort by number of hits
  filter = filter.sort((a, b) => b.num - a.num)
  filter.unshift({ label: ALL })
  return filter
}

// debug: check if session ended and prints a debug message
export function checkEndOfSession (html, place) {
  if (html.indexOf('Ende der Sitzung') !== -1) {
    console.log('Session ended (check request "' + place + '")')
  }
}

export function checkPagesVsResults (pages, results) {
  // less than the expected amount of results (at least 22 results per page except the last one)
  if (results < (pages - 1) * 22 + 1) {
    console.log('Number of results (' + results + ') does not fit the number of pages (' + pages + ')')
  }
}
