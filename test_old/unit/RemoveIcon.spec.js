import { shallowMount } from '@vue/test-utils'
import RemoveIcon from '@/components/icons/RemoveIcon'

describe('RemoveIcon.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(RemoveIcon, {
      propsData: {
        identifier: 'foo'
      }
    })

    expect(wrapper.find('i').attributes('class')).toEqual('fas fa-trash')
  })
})
