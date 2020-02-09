import { shallowMount } from '@vue/test-utils'
import MediumIcon from '@/components/icons/MediumIcon'
import { mediumIcons } from '@/utils/constants'

describe('MediumIcon.vue', () => {
  mediumIcons.map(faIcon => {
    faIcon.text.map(el => {
      it('renders icon: ' + el, () => {
        const wrapper = shallowMount(MediumIcon, {
          propsData: {
            medium: el
          }
        })

        expect(wrapper.find('i').attributes('class')).toEqual(faIcon.icon)
      })
    })
  })

  it('empty for unknown medium', () => {
    const wrapper = shallowMount(MediumIcon, {
      propsData: {
        medium: 'foo'
      }
    })

    expect(wrapper.find('i').exists()).toEqual(false)
  })
})
