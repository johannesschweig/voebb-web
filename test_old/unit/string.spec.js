import { getCurrentDateString, shortenLibraryName, sanitizeDetail, getDaysDue, getAvailability, getCondensedAvailability, calculateWidth, getMediaFilter } from '@/utils/string.js'
import { mediumFilter } from '@/utils/constants.js'

function getDateFromToday (days) {
  let date = new Date(new Date().getTime() + (days * 24 * 60 * 60 * 1000))
  return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
}

let statusAvail = [
  { text: 'Verfügbar', available: true, avail: { days: -Number.MAX_SAFE_INTEGER, message: 'available' } },
  { text: 'ist verfügbar', available: true, avail: { days: -Number.MAX_SAFE_INTEGER, message: 'available' } },
  { text: 'Ausgeliehen - Fällig am: ' + getDateFromToday(2), available: false, avail: { days: 2, message: '2 days left' } },
  { text: 'Ausgeliehen - Fällig am: ' + getDateFromToday(-12), available: false, avail: { days: -12, message: '12 days overdue' } },
  { text: 'Ausgeliehen Fällig am', available: false, avail: { days: -99, message: '99 days overdue' } },
  { text: 'Ausgeliehen - Fällig am: d.d.a', available: false, avail: { days: -99, message: '99 days overdue' } },
  { text: 'Nicht im Regal', available: false, avail: { days: Number.MAX_SAFE_INTEGER, message: 'lost' } },
  { text: 'verloren', available: false, avail: { days: Number.MAX_SAFE_INTEGER, message: 'lost' } },
  { text: 'zurzeit vermisst', available: false, avail: { days: Number.MAX_SAFE_INTEGER, message: 'lost' } },
  { text: 'Reserviert', available: false, avail: { days: Number.MAX_SAFE_INTEGER, message: 'reserved' } },
  { text: 'Ausgeliehen', available: false, avail: { days: Number.MAX_SAFE_INTEGER, message: 'borrowed' } },
  { text: 'Siehe Vollanzeige', available: false, avail: { days: Number.MAX_SAFE_INTEGER, message: 'unknown' } }
]

describe('string.js', () => {
  it('returns date string in correct format', () => {
    expect(getCurrentDateString()).toMatch(/^\d\d:\d\d$/)
  })

  it('returns date string in correct format', () => {
    expect(shortenLibraryName('test: foo (bar)')).toEqual('foo')
    expect(shortenLibraryName('foo')).toEqual('foo')
    expect(shortenLibraryName('Bibl.')).toEqual('Bibliothek')
    expect(shortenLibraryName('Ju.bibl. (foo)')).toEqual('Jugendbibliothek')
  })

  it('sanitizes details', () => {
    expect(sanitizeDetail('ISBN', '123-456-789')).toEqual('123456789')
    expect(sanitizeDetail('Titel', 'foo; bar(123')).toEqual('foo')
    expect(sanitizeDetail('Titel', 'foo( bar[123')).toEqual('foo')
    expect(sanitizeDetail('Titel', 'foo[ bar;123')).toEqual('foo')
    expect(sanitizeDetail('Titel', 'foo. bar.123')).toEqual('foo. bar.123')
    expect(sanitizeDetail('Titel', 'foo [123] bar')).toEqual('foo bar')
    expect(sanitizeDetail('foo', 'bar')).toEqual('bar')
  })

  it('computes days due', () => {
    expect(getDaysDue('foo: ' + getDateFromToday(100))).toEqual(100)
    expect(getDaysDue('foo')).toEqual(-99)
  })

  it('returns condensed availability message', () => {
    let unsorted = [ 10, 2, -3, 0, 4 ]
    let copies = unsorted.map(e => ({ availability: { days: e } }))
    expect(getCondensedAvailability(copies)).toEqual({ days: -3 })
    expect(getCondensedAvailability([])).toEqual({ days: Number.MAX_SAFE_INTEGER, message: 'not available' })
  })

  it('transforms status in availability object', () => {
    for (let i = 0; i < statusAvail.length; i++) {
      expect(getAvailability(statusAvail[i].text, statusAvail[i].available)).toEqual(statusAvail[i].avail)
    }
  })

  it('calculates the width for dropdowns', () => {
    expect(calculateWidth(['x', 'fooo', 'xx'])).toEqual({ width: '53px' })
  })

  it('returns correct filters for media', () => {
    let media = ['CD', 'Band', 'Buch']
    let expected = [ { 'label': 'All' }, { 'label': 'Book', 'num': 2, 'text': mediumFilter[3].text }, { 'label': 'CD', 'num': 1, 'text': mediumFilter[1].text } ]

    expect(getMediaFilter(media)).toEqual(expected)
  })
})
