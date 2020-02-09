import { shallowMount } from '@vue/test-utils'
import Sorter from '@/components/Sorter'

describe('Sorter.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(Sorter, {
      propsData: {
        sorting: 'foo',
        criterions: ['bar', 'foo']
      }
    })

    expect(wrapper.findAll('option').at(0).attributes('value')).toEqual('bar')
    expect(wrapper.findAll('option').at(1).attributes('value')).toEqual('foo')
    // FIXME test if second option is shown
  })
})
