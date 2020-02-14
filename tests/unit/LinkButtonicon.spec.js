import { shallowMount } from '@vue/test-utils'
import LinkButtonIcon from '@/components/icons/LinkButtonIcon'

describe('LinkButtonIcon.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(LinkButtonIcon, {
      propsData: {
        identifier: 'foo'
      },
      stubs: {
        LinkIcon: true
      }
    })

    expect(wrapper.find('a').attributes('href')).toEqual('https://voebb.de/aDISWeb/app?service=direct/0/Home/$DirectLink&sp=SPROD00&sp=Sfoo')
    expect(wrapper.find('linkicon-stub').exists()).toBeTruthy()
  })
})
