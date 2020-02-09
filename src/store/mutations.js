import { INITIAL, SEARCH, BOOKMARKS, PREVIEW, SEARCH_PAGE_CRITERIONS, BOOKMARKS_PAGE_CRITERIONS } from '../utils/constants.js'

// mutations
export default {
  // adds a bookmark
  addBookmark (state, results) {
    state.bookmarks.data.push(results)
  },
  // removes a bookmark
  removeBookmark (state, identifier) {
    state.bookmarks.data = state.bookmarks.data.filter(b => b.identifier !== identifier)
  },
  // sets the search results data
  setSearchResultsData (state, results) {
    state.search.data = results
  },
  // clear search results
  clearSearchResultsData (state) {
    state.search.data = []
  },
  // sets the preview data
  setPreviewData (state, results) {
    state.preview.data = results
  },
  // clear the preview data
  clearPreviewData (state) {
    state.preview.data = {
      details: [],
      copies: [],
      availability: {}
    }
    // reset loading status
    state.preview.loading.status = INITIAL
  },
  setBookmarksData (state, results) {
    state.bookmarks.data = results
  },
  // sets the last updated label to a new string
  setLastUpdated (state, dateString) {
    state.bookmarks.lastUpdated = dateString
  },
  // updates the store for preferred libraries
  setLibraries (state, libraries) {
    state.libraries = libraries
  },
  // sets the loading state
  setLoading (state, payload) {
    switch (payload.component) {
      case SEARCH: state.search.loading = payload.data
        break
      case PREVIEW: state.preview.loading = payload.data
        break
      case BOOKMARKS: state.bookmarks.loading = payload.data
        break
    }
  },
  // sets the sorting of a page
  // page: page to apply it to
  // criterion: criterion to set it to
  setSorting (state, payload) {
    switch (payload.page) {
      case SEARCH: state.search.sorting = payload.criterion
        break
      case BOOKMARKS: state.bookmarks.sorting = payload.criterion
        break
    }
  },
  // reset the sorting to the default
  // page: page to apply it to
  resetSorting (state, page) {
    switch (page) {
      case SEARCH: state.search.sorting = SEARCH_PAGE_CRITERIONS[0]
        break
      case BOOKMARKS: state.bookmarks.sorting = BOOKMARKS_PAGE_CRITERIONS[0]
        break
    }
  },
  // sets the filter for the search results
  setFilter (state, filter) {
    state.search.filter = filter
  },
  // set User
  setUser (state, user) {
    state.user = user
  },
  // set access token
  setAccessToken (state, accessToken) {
    state.accessToken = accessToken
  }
}
