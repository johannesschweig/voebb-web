import { shallowMount } from '@vue/test-utils'
import Preview from '@/components/Preview'
import LoadingCircle from '@/components/icons/LoadingCircle'
import { LOADING } from '@/utils/constants'

const msg = 'foo'
const title = 'title'
const stubs = {
  'router-link': true,
  'router-view': true,
  BackArrowIcon: true
}

describe('Preview.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(Preview, {
      // FIXME: stub for router view is not available
      stubs,
      computed: {
        data: () => ({
          details: {
            Medienart: 'foo',
            Titel: title,
            img: 'img'
          },
          identifier: '123'
        }),
        getCurrentWrapper: () => 'foo'
      }
    })

    expect(wrapper.find('h1').text()).toEqual(title)
    expect(wrapper.find('img').attributes('src')).toEqual('img')
    expect(wrapper.find('div.no-image').exists()).toBeFalsy()
    expect(wrapper.find('.navigation').findAll('router-link-stub').at(0).text()).toEqual('Details')
    expect(wrapper.find('.navigation').findAll('router-link-stub').at(1).text()).toEqual('Copies')
  })

  it('displays loading circle if loading', () => {
    const wrapper = shallowMount(Preview, {
      computed: {
        data: () => ({ details: [] }),
        loading: () => ({ status: LOADING, msg })
      }
    })

    expect(wrapper.find(LoadingCircle).exists()).toBeTruthy()
  })

  it('does not display navigation if e resource', () => {
    const wrapper = shallowMount(Preview, {
      stubs,
      computed: {
        data: () => ({
          details: { Medienart: 'E-' },
          identifier: '123'
        }),
        getCurrentWrapper: () => 'foo'
      }
    })

    expect(wrapper.find('.navigation').exists()).toBeFalsy()
    // no image
    expect(wrapper.find('img').exists()).toBeFalsy()
    expect(wrapper.find('div.no-image').exists()).toBeTruthy()
  })
})
