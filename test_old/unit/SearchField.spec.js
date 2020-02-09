import { shallowMount } from '@vue/test-utils'
import SearchField from '@/components/SearchField'
import Sorter from '@/components/Sorter'
import MediumFilter from '@/components/MediumFilter'

describe('SearchField.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(SearchField, {
      computed: {
        numberOfResults: () => 0
      }
    })

    expect(wrapper.find('h1').text()).toEqual('Search')
    expect(wrapper.find('input').attributes('placeholder')).toEqual('Search for books, cds...')
    // no number of results label, filter and sorter
    expect(wrapper.find('.grid').exists()).toBeFalsy()
  })

  it('renders Sorter if multiple results available', () => {
    const wrapper = shallowMount(SearchField, {
      data () {
        return {
          SEARCH_PAGE_CRITERIONS: []
        }
      },
      computed: {
        numberOfResults: () => 2,
        sorterSorting: () => 'foo',
        getNumberOfResultsString: () => 'bar',
        getCurrentMediaFilters: () => []
      }
    })

    expect(wrapper.find(Sorter).exists()).toBeTruthy()
    expect(wrapper.find(MediumFilter).exists()).toBeTruthy()
    expect(wrapper.find('span').text()).toEqual('bar')
  })
})
