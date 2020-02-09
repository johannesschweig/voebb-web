import { shallowMount } from '@vue/test-utils'
import LoadingCircle from '@/components/icons/LoadingCircle'

describe('LoadingCircle.vue', () => {
  it('renders with message', () => {
    const wrapper = shallowMount(LoadingCircle, {
      propsData: {
        msg: 'foo'
      }
    })

    expect(wrapper.find('.sk-fading-circle').exists()).toBeTruthy()
    expect(wrapper.find('span').text()).toEqual('foo')
  })
})
