import { shallowMount } from '@vue/test-utils'
import BookmarkButtonIcon from '@/components/icons/BookmarkButtonIcon'

describe('BookmarkButtonIcon.vue', () => {
  it('renders active icon', () => {
    const wrapper = shallowMount(BookmarkButtonIcon, {
      propsData: {
        identifier: 'foo'
      },
      computed: {
        active: () => true
      },
      stubs: {
        BookmarkIcon: true
      }
    })

    expect(wrapper.find('bookmarkicon-stub').attributes('class')).toEqual('active')
  })

  it('renders inactive icon', () => {
    const wrapper = shallowMount(BookmarkButtonIcon, {
      propsData: {
        identifier: 'foo'
      },
      computed: {
        active: () => false
      },
      stubs: {
        BookmarkIcon: true
      }
    })

    expect(wrapper.find('bookmarkicon-stub').attributes('class')).toEqual('')
  })
})
