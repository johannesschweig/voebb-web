import { shallowMount } from '@vue/test-utils'
import SearchResults from '@/components/SearchResults'
import LoadingCircle from '@/components/icons/LoadingCircle'
import { LOADING, DONE } from '@/utils/constants'

const msg = 'loading-msg'

describe('SearchResults.vue', () => {
  it('renders placeholder by default', () => {
    const wrapper = shallowMount(SearchResults, {
      computed: {
        results: () => [],
        loading: () => ({
          status: DONE,
          msg
        }),
        numberOfResults: () => 0,
        getSearchData: () => []
      }
    })

    expect(wrapper.find(SearchResults).exists()).toBeTruthy()
    expect(wrapper.find('.container span.placeholder').text()).toEqual(msg)
  })

  it('displays loading circle if loading', () => {
    const wrapper = shallowMount(SearchResults, {
      computed: {
        results: () => [],
        loading: () => ({
          status: LOADING,
          msg
        }),
        numberOfResults: () => 0,
        getSearchData: () => []
      }
    })

    expect(wrapper.find(LoadingCircle).exists()).toBeTruthy()
  })
})
