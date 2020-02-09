import actions from '../../src/renderer/store/actions'

describe('actions.js', () => {
  it('adds bookmarks', () => {
    let bookmarksList = ['11', '22', '44']
    const mockCommit = () => {
      bookmarksList.push('foo')
    }
    const getters = {
      bookmarksList
    }

    actions.toggleBookmark({ commit: mockCommit, getters }, { identifier: '33', active: false })
    expect(bookmarksList.length).toEqual(4)
  })

  it('removes bookmarks', () => {
    let bookmarksList = ['11', '22', '44']
    const mockDispatch = () => {
      bookmarksList.pop()
    }
    const getters = {
      bookmarksList
    }

    actions.toggleBookmark({ dispatch: mockDispatch, getters }, { identifier: '33', active: true })
    expect(bookmarksList.length).toEqual(2)
  })

  it('does not add a bookmark if already present', () => {
    let bookmarksList = ['11', '22', '33']
    const mockCommit = () => {
      bookmarksList.push('foo')
    }
    const getters = {
      bookmarksList
    }

    actions.toggleBookmark({ commit: mockCommit, getters }, { identifier: '33', active: false })
    expect(bookmarksList.length).toEqual(3)
  })
})
