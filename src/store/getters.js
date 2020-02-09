import { allLibraries, DONE, MOST_RELEVANT, NEWEST, TITLE_A_Z, TITLE_Z_A, AVAILABLE, ALL } from '../utils/constants'
import { extractYear, shortenLibraryName, getMediaFilter } from '../utils/string'

export default {
  // returns a list with all the bookmarks identifiers
  bookmarksList: state => {
    return state.bookmarks.data.map(obj => obj.identifier)
  },
  // returns true if details are available for the bookmarks
  detailsAvailable: state => {
    // no bookmarks at all
    if (state.bookmarks.data.length === 0) {
      return false
      // bookmarks missing details
    } else if (!state.bookmarks.data[0].details) {
      return false
    } else {
      return true
    }
  },
  // returns a list of the availabilities from preferred libraries
  getPreferredLibraries: state => {
    if (state.libraries.length === 0) {
      return allLibraries
    } else {
      return state.libraries
    }
  },
  numberOfResults: state => {
    if (state.search.loading.status === DONE) {
      return state.search.data.length
    } else {
      return 0
    }
  },
  numberOfFilteredResults: (_state, getters) => {
    return getters.getSearchData.length
  },
  getSearchData: state => {
    let data = state.search.data
    if (state.search.filter.label !== ALL) {
      data = data.filter(obj => state.search.filter.text.indexOf(obj.medium) !== -1)
    }
    switch (state.search.sorting) {
      case MOST_RELEVANT: return data
      case NEWEST: return data.slice().sort((a, b) => {
        return b.year - a.year
      })
      case TITLE_A_Z: return data.slice().sort((a, b) => {
        return a.title.localeCompare(b.title)
      })
      case TITLE_Z_A: return data.slice().sort((a, b) => {
        return b.title.localeCompare(a.title)
      })
    }
  },
  multipleBookmarksAvailable: state => {
    return state.bookmarks.data.length > 1 && state.bookmarks.loading.status === DONE
  },
  getBookmarksData: state => {
    switch (state.bookmarks.sorting) {
      // sort available (0 days) > days due (-x days) > days left (x days) > not available (INF days)
      case AVAILABLE: return state.bookmarks.data.slice().sort((a, b) => {
        return a.availability.days - b.availability.days
      })
      case TITLE_A_Z: return state.bookmarks.data.slice().sort((a, b) => {
        return a.details['Titel'].localeCompare(b.details['Titel'])
      })
      case TITLE_Z_A: return state.bookmarks.data.slice().sort((a, b) => {
        return b.details['Titel'].localeCompare(a.details['Titel'])
      })
      case NEWEST: return state.bookmarks.data.slice().sort((a, b) => {
        return extractYear(b.details['Veröffentlichung']) - extractYear(a.details['Veröffentlichung'])
      })
    }
  },
  // extracts identifier from search data
  getSearchIdentifiers: (_state, getters) => {
    return getters.getSearchData.map(e => e.identifier)
  },
  // extracts identifier from bookmarks data
  getBookmarksIdentifiers: (_state, getters) => {
    return getters.getBookmarksData.map(e => e.identifier)
  },
  // returns copies from preferred libraries sorted by availability
  getPreferredCopies: (state, getters) => {
    return state.preview.data.copies.filter(obj => getters.getPreferredLibraries.includes(obj.library)).sort((a, b) => a.availability.days - b.availability.days)
  },
  // returns a comma-separated string with copies from non-preferred libraries sorted alphabetically
  getNotPreferredCopiesString: (state, getters) => {
    let copies = state.preview.data.copies.filter(obj => !getters.getPreferredLibraries.includes(obj.library))
    if (copies.length) {
      return copies.map(e => shortenLibraryName(e.library)).sort().join(', ')
    } else {
      return ''
    }
  },
  // returns applicable filters with numbers for current search results
  getCurrentMediaFilters: (state) => {
    return getMediaFilter(state.search.data.map(obj => obj.medium))
  }
}
