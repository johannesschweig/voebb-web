import { search, getEntryDetails } from '../utils/requests'
import { getCurrentDateString, addAvailability } from '../utils/string'
import { getUserData, setUserData } from '../utils/userStorage'
import { INITIAL, LOADING, TOO_MANY_HITS, NO_HITS, DONE, SEARCH, BOOKMARKS, PREVIEW, ALL } from '../utils/constants'
import { getLoadingObject, CustomError } from '../utils/utils'

// actions
export default {
  // read user data (bookmarks, preferred libraries)
  readUserData ({ commit, state, getters }) {
    // read libraries
    getUserData(state.user, 'libraries', state.accessToken).then(data => {
      if (Object.keys(data).length === 0) {
        throw new Error('handled')
      }
      console.log('Fetched user data for key', 'libraries', data.length, 'entries')
      commit('setLibraries', data)
    }).catch(() => {
      console.log('Not logged in. Libraries not available')
    })
    // read bookmarks
    getUserData(state.user, 'bookmarks', state.accessToken).then(data => {
      commit('setLoading', getLoadingObject(BOOKMARKS, LOADING, 'Fetching bookmarks'))
      // no bookmarks
      if (Object.keys(data).length === 0) {
        throw new CustomError('Bookmarks file missing')
      }
      console.log('Fetched user data for key', 'bookmarks', data.length, 'entries')
      // fetch all bookmarks details, copies, availability
      let promises = []
      data.map(bookmark => {
        promises.push(getEntryDetails(bookmark))
      })
      return Promise.all(promises)
    }).then(res => {
      commit('setLoading', getLoadingObject(BOOKMARKS, DONE))
      // adds availability to results
      let results = addAvailability(res, getters.getPreferredLibraries)
      commit('setBookmarksData', results)
      commit('setLastUpdated', getCurrentDateString())
    }).catch(err => {
      if (err instanceof CustomError) {
        switch (err.message) {
          case 'Bookmarks file missing':
            commit('setLoading', getLoadingObject(BOOKMARKS, DONE, 'You have not added any bookmarks yet'))
            console.log('Not logged in. Bookmarks user file not available')
            break
        }
      } else {
        console.log('Error detected')
        throw err
      }
    })
  },
  fakeReadUserData ({ commit, getters }) {
    let results = []
    let ids = ['AK34245414']//, 'AK34211530', 'AK12594954', 'AK12594953', 'AK12009789']
    ids.map(identifier => {
      results.push(getEntryDetails(identifier, true))
    })
    // get availability
    results = addAvailability(results, getters.getPreferredLibraries)
    commit('setBookmarksData', results)
    commit('setLastUpdated', `fake-${getCurrentDateString()}`)
    commit('setLoading', getLoadingObject(BOOKMARKS, DONE))
  },
  // toggles a bookmark: removes or adds it
  // active: if the bookmark icon is filled or not
  // identifier: of the instance
  toggleBookmark ({ commit, state, dispatch, getters }, payload) {
    if (payload.active) {
      dispatch('removeBookmark', payload.identifier)
    } else if (getters.bookmarksList.indexOf(payload.identifier) === -1) {
      // fetch all bookmarks details, availability
      commit('setLoading', getLoadingObject(BOOKMARKS, LOADING, 'Adding bookmark'))
      getEntryDetails(payload.identifier)
        .then(res => {
          let bookmarks = getters.bookmarksList.concat([payload.identifier])
          // update user storage
          setUserData(state.user, 'bookmarks', bookmarks, state.accessToken)
          // get availability
          let results = addAvailability([res], getters.getPreferredLibraries)[0]
          commit('addBookmark', results)
          commit('setLastUpdated', getCurrentDateString())
          commit('setLoading', getLoadingObject(BOOKMARKS, DONE))
          console.log('Added bookmark', payload.identifier)
        })
    } else {
      console.log('Bookmark already in the list of bookmarks.')
    }
  },
  // fake search for testing purposes
  fakeSearch ({ commit }) {
    // clear search results and preview data
    commit('clearSearchResultsData')
    commit('clearPreviewData')
    commit('resetSorting', SEARCH)
    commit('setFilter', { label: ALL })
    // prepare loading objects
    commit('setLoading', getLoadingObject(SEARCH, LOADING, 'Fake search'))
    let res = search('SearchResultsPageRegular', true)
    commit('setLoading', getLoadingObject(SEARCH, DONE))
    commit('setSearchResultsData', res)
  },
  // search for term
  search ({ commit }, term) {
    // clear search results
    commit('resetSorting', SEARCH)
    commit('setFilter', { label: ALL })
    // prepare loading objects
    let loading = getLoadingObject(SEARCH, LOADING, `Searching for ${term}`)
    commit('setLoading', loading)
    let done = getLoadingObject(SEARCH)

    // start search
    search(term, false).then(res => {
      // check result and update loading state
      if (typeof res === 'string') {
        done.data.status = res
        if (res === NO_HITS) { // no hits
          done.data.msg = `Sorry! We can't find anything for "${term}"`
        } else if (res === TOO_MANY_HITS) { // too many hits
          done.data.msg = `There were too many hits for "${term}". Try adjusting your search.`
        }
      } else { // all fine
        done.data.status = DONE
      }
      commit('setLoading', done)
      commit('setSearchResultsData', res)
    })
  },
  // fetch details data on instance
  fetchDetails ({ commit, state }, identifier) {
    // check if identifier already in preview
    if (identifier !== state.preview.data.identifier) {
      // clear preview data
      commit('clearPreviewData')
      // prepare loading objects
      let loading = getLoadingObject(PREVIEW, LOADING, 'Fetching details')
      commit('setLoading', loading)
      let done = getLoadingObject(PREVIEW, DONE)
      // fetch details
      getEntryDetails(identifier).then(res => {
        commit('setLoading', done)
        commit('setPreviewData', res)
      })
    }
  },
  // fake fetch details for testing purposes
  fakeFetchDetails ({ commit }) {
    // clear preview data
    commit('clearPreviewData')
    // prepare loading objects
    let loading = getLoadingObject(PREVIEW, LOADING, 'Fake preview fetching')
    commit('setLoading', loading)
    let done = getLoadingObject(PREVIEW, DONE)
    // fake fetch details
    commit('setLoading', done)
    commit('setPreviewData', getEntryDetails('AK34245414', true))
  },
  // removes bookmark
  removeBookmark ({ commit, state, getters }, identifier) {
    // update bookmarks file
    let bookmarks = getters.bookmarksList.filter(b => b !== identifier)
    // check if last bookmark
    if (bookmarks.length === 0) {
      commit('setLoading', getLoadingObject(BOOKMARKS, INITIAL, 'You have not added any bookmarks yet.'))
    }
    // update user storage
    setUserData(state.user, 'bookmarks', bookmarks, state.accessToken)
    commit('removeBookmark', identifier)
    console.log('Removed bookmark', identifier)
  },
  // updates the store and user settings for preferred libraries
  setLibraries ({ commit, state }, libraries) {
    console.log('Updating libraries', libraries.length, 'entries')
    setUserData(state.user, 'libraries', libraries, state.accessToken)
    commit('setLibraries', libraries)
  },
  // sorts the sorting criterion for a list of results
  // page: the page to sort (search or bookmarks)
  // criterion: which sorting criterion to apply
  setSorting ({ commit }, payload) {
    commit('setSorting', payload)
  },
  // sets the medium filter for search results
  setFilter ({ commit }, filter) {
    commit('setFilter', filter)
  },
  setToken ({ commit }, token) {
    commit('setAccessToken', token.slice(1))
    commit('setUser', token[0])
  }

}
