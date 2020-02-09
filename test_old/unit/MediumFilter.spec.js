import { shallowMount } from '@vue/test-utils'
import MediumFilter from '@/components/MediumFilter'

describe('MediumFilter.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(MediumFilter, {
      propsData: {
        criterions: [
          { label: 'bar' },
          { label: 'foo' }
        ]
      },
      computed: {
        filter: () => ({ label: 'foo' })
      }
    })

    expect(wrapper.findAll('option').at(0).attributes('value')).toEqual('bar')
    expect(wrapper.findAll('option').at(1).attributes('value')).toEqual('foo')
    // FIXME test if second option is shown
  })
})
