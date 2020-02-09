import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import Card from '@/components/Card'

const row = {
  title: 'title',
  medium: 'medium',
  name: 'name',
  year: 'year',
  availability: {
    days: 0,
    message: 'available'
  },
  identifier: 'identifier'
}
const img = 'img'

describe('Card.vue', () => {
  it('renders for Search', () => {
    const wrapper = shallowMount(Card, {
      propsData: {
        row: {
          ...row,
          img
        },
        wrapper: 'Search'
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    })

    expect(wrapper.find('.card.search').exists()).toBeTruthy()
    expect(wrapper.find('img').attributes('src')).toEqual(img)
    expect(wrapper.find('.title').text()).toEqual(`${row.title} (${row.medium})`)
    expect(wrapper.find('.subtitle').text()).toMatch(new RegExp(row.name + '\\s*-.*' + row.year))
  })

  it('renders for Bookmarks', () => {
    const wrapper = shallowMount(Card, {
      propsData: {
        row,
        wrapper: 'Bookmarks'
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    })

    expect(wrapper.find('.card.bookmarks').exists()).toBeTruthy()
    expect(wrapper.find('img').attributes('src')).toEqual('')
    expect(wrapper.find('.title').text()).toEqual(`${row.title} (${row.medium})`)
    expect(wrapper.find('.subtitle').text()).toMatch(new RegExp(row.name + '\\s*-.*' + row.year))
    expect(wrapper.find('span').text()).toEqual(row.availability.message)
  })

  it('correct class if not available', () => {
    const wrapper = shallowMount(Card, {
      propsData: {
        row: {
          ...row,
          availability: {
            days: 8
          }
        },
        wrapper: 'Bookmarks'
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    })

    expect(wrapper.find('.card.not-available').exists()).toBeTruthy()
  })

  it('omits year if empty', () => {
    const wrapper = shallowMount(Card, {
      propsData: {
        row: {
          ...row,
          year: 0
        },
        wrapper: 'Search'
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    })

    expect(wrapper.find('.subtitle').text()).toEqual(row.name)
  })
})
