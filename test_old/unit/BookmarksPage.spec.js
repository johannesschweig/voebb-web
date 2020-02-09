import { shallowMount } from '@vue/test-utils'
import BookmarksPage from '@/components/BookmarksPage'
import LoadingCircle from '@/components/icons/LoadingCircle'
import Sorter from '@/components/Sorter'
import { INITIAL, LOADING } from '@/utils/constants'

const msg = 'placeholder-msg'
const lastUpdated = 'last-updated'

describe('BookmarksPage.vue', () => {
  it('renders placeholder if no bookmarks added', () => {
    const wrapper = shallowMount(BookmarksPage, {
      computed: {
        loading: () => ({
          status: INITIAL,
          msg
        }),
        detailsAvailable: () => false,
        getBookmarksData: () => [],
        multipleBookmarksAvailable: () => false
      }
    })

    expect(wrapper.find('span').text()).toEqual(msg)
    expect(wrapper.find(Sorter).exists()).toBeFalsy()
  })

  it('displays last updated if details are available', () => {
    const wrapper = shallowMount(BookmarksPage, {
      computed: {
        lastUpdated: () => lastUpdated,
        detailsAvailable: () => true,
        getBookmarksData: () => [],
        multipleBookmarksAvailable: () => false

      }
    })

    expect(wrapper.findAll('.last-updated .placeholder').at(1).text()).toEqual(lastUpdated)
    expect(wrapper.find(Sorter).exists()).toBeFalsy()
  })

  it('displays loading circle while loading', () => {
    const wrapper = shallowMount(BookmarksPage, {
      computed: {
        loading: () => ({ status: LOADING, msg: msg }),
        detailsAvailable: () => false,
        getBookmarksData: () => [],
        multipleBookmarksAvailable: () => false
      }
    })

    expect(wrapper.find(LoadingCircle).exists()).toBeTruthy()
  })

  it('displays sorter if multiple bookmarks available', () => {
    const wrapper = shallowMount(BookmarksPage, {
      data () {
        return {
          BOOKMARKS_PAGE_CRITERIONS: []
        }
      },
      computed: {
        sorterSorting: () => 'foo',
        loading: () => ({ status: LOADING, msg: msg }),
        detailsAvailable: () => false,
        getBookmarksData: () => [],
        multipleBookmarksAvailable: () => true
      }
    })

    expect(wrapper.find(Sorter).exists()).toBeTruthy()
  })
})
