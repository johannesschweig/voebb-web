import getters from '@/store/getters'
import { bookmarksSample } from './utils'
import { allLibraries, DONE, MOST_RELEVANT, NEWEST, TITLE_A_Z, TITLE_Z_A, AVAILABLE, ALL } from '@/utils/constants'

describe('getters', () => {
  it('returns list with bookmarks identifiers', () => {
    const state = {
      bookmarks: {
        data: [
          { a: 0, identifier: 'foo' },
          { b: 0, identifier: 'bar' }
        ]
      }
    }

    const list = getters.bookmarksList(state)
    expect(list).toEqual(['foo', 'bar'])
  })

  it('returns if details not available', () => {
    const state = {
      bookmarks: {
        data: []
      }
    }

    // empty data
    let flag = getters.detailsAvailable(state)
    expect(flag).toEqual(false)

    // no details in data
    state.bookmarks.data = [{}]
    flag = getters.detailsAvailable(state)
    expect(flag).toEqual(false)

    // details available
    state.bookmarks.data = [{ details: {} }]
    flag = getters.detailsAvailable(state)
    expect(flag).toEqual(true)
  })

  it('returns preferred libraries', () => {
    let state = {
      libraries: ['foo']
    }

    // preferred libraries set
    let libs = getters.getPreferredLibraries(state)
    expect(libs).toEqual(state.libraries)
    // preferred libraries not set
    state.libraries = []
    libs = getters.getPreferredLibraries(state)
    expect(libs).toEqual(allLibraries)
  })

  it('returns number of results', () => {
    let state = {
      search: {
        data: [ 1, 2, 3 ],
        loading: {
          status: 'foo'
        }
      }
    }
    // loading not done
    expect(getters.numberOfResults(state)).toEqual(0)
    state.search.loading.status = DONE
    // loading done
    expect(getters.numberOfResults(state)).toEqual(3)
  })

  it('sorts search results correctly', () => {
    let state = {
      search: {
        sorting: MOST_RELEVANT,
        data: [
          { title: 'b', year: 1 },
          { title: 'c', year: 4 },
          { title: 'cc', year: 2 },
          { title: 'a', year: 3 }
        ],
        filter: {
          label: ALL
        }
      }
    }

    // most relevant
    let sorting = getters.getSearchData(state)
    expect(sorting).toEqual(state.search.data)
    // newest
    state.search.sorting = NEWEST
    sorting = getters.getSearchData(state)
    expect(sorting).toEqual([1, 3, 2, 0].map(i => state.search.data[i]))
    // title a-z
    state.search.sorting = TITLE_A_Z
    sorting = getters.getSearchData(state)
    expect(sorting).toEqual([3, 0, 1, 2].map(i => state.search.data[i]))
    // title z-a
    state.search.sorting = TITLE_Z_A
    sorting = getters.getSearchData(state)
    expect(sorting).toEqual([2, 1, 0, 3].map(i => state.search.data[i]))
  })

  it('returns if multiple bookmarks available', () => {
    let state = {
      bookmarks: {
        data: []
      }
    }
    // bookmarks data empty
    let multiple = getters.multipleBookmarksAvailable(state)
    expect(multiple).toEqual(false)
    // still not done with loading
    state.bookmarks.loading = { status: 'foo' }
    multiple = getters.multipleBookmarksAvailable(state)
    expect(multiple).toEqual(false)
    // bookmarks and loading done
    state.bookmarks.data = [1]
    state.bookmarks.loading = { status: DONE }
    multiple = getters.multipleBookmarksAvailable(state)
    expect(multiple).toEqual(false)
  })

  it('sorts bookmarks correctly', () => {
    let state = bookmarksSample
    state.bookmarks.sorting = AVAILABLE

    // available
    let sorted = getters.getBookmarksData(state)
    let sortedSample = [2, 6, 3, 5, 4, 1, 0].map(val => bookmarksSample.bookmarks.data[val])
    expect(sorted).toEqual(sortedSample)
    // title a-z
    state.bookmarks.sorting = TITLE_A_Z
    sorted = getters.getBookmarksData(state)
    sortedSample = [1, 2, 0, 5, 6, 3, 4].map(val => bookmarksSample.bookmarks.data[val])
    expect(sorted).toEqual(sortedSample)
    // title z-a
    state.bookmarks.sorting = TITLE_Z_A
    sorted = getters.getBookmarksData(state)
    sortedSample = [4, 3, 6, 5, 0, 2, 1].map(val => bookmarksSample.bookmarks.data[val])
    expect(sorted).toEqual(sortedSample)
    // newest
    state.bookmarks.sorting = NEWEST
    sorted = getters.getBookmarksData(state)
    sortedSample = [4, 3, 1, 6, 5, 0, 2].map(val => bookmarksSample.bookmarks.data[val])
    expect(sorted).toEqual(sortedSample)
  })

  it('extracts identifiers from search and bookmarks data', () => {
    let fakeGetters = {
      getSearchData: [
        { identifier: '1' },
        { identifier: '2' },
        { identifier: '3' }
      ],
      getBookmarksData: [
        { identifier: '1' },
        { identifier: '2' },
        { identifier: '3' }
      ]
    }
    expect(getters.getSearchIdentifiers(null, fakeGetters)).toEqual(['1', '2', '3'])
    expect(getters.getBookmarksIdentifiers(null, fakeGetters)).toEqual(['1', '2', '3'])
  })

  it('sorts copies', () => {
    const fakeGetters = {
      getPreferredLibraries: ['foo']
    }
    const state = {
      preview: {
        data: {
          copies: [
            { library: 'foo', availability: { days: 13 } },
            { library: 'foo', availability: { days: -13 } },
            { library: 'foo', availability: { days: 0 } },
            { library: 'foo', availability: { days: 3 } },
            { library: 'bar', availability: { days: -99 } }
          ]
        }
      }
    }
    expect(getters.getPreferredCopies(state, fakeGetters).map(obj => obj.availability.days)).toEqual([ -13, 0, 3, 13 ])
  })

  it('returns a string with non-preferred libraries', () => {
    const fakeGetters = {
      getPreferredLibraries: ['foo']
    }
    const state = {
      preview: {
        data: {
          copies: [
            { library: 'bb' },
            { library: 'aa' },
            { library: 'b' },
            { library: 'a' },
            { library: 'foo' }
          ]
        }
      }
    }
    expect(getters.getNotPreferredCopiesString(state, fakeGetters)).toEqual('a, aa, b, bb')
  })
})
