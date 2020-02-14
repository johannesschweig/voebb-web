import { shallowMount } from '@vue/test-utils'
import Copies from '@/components/Copies'

const instances = [{
  library: 'library1',
  place: 'place1',
  signature: 'signature1',
  status: 'Ausgeliehen - Fällig am: 24.6.2019',
  availability: {
    days: 13,
    message: '13 days overdue'
  }
}, {
  library: 'library2',
  place: 'place2',
  signature: 'signature2',
  status: 'verfügbar',
  availability: {
    days: -Number.MAX_SAFE_INTEGER,
    message: 'available'
  }
}, {
  library: 'library3',
  place: 'place3',
  signature: 'signature3',
  status: 'Nicht im Regal',
  availability: {
    days: Number.MAX_SAFE_INTEGER,
    message: 'lost'
  }
}, {
  library: 'library4',
  place: 'place4',
  signature: 'signature4',
  status: 'foo',
  availability: {
    days: -99,
    message: '99 days overdue'
  }
}, {
  library: 'library5',
  place: 'place5',
  signature: 'signature5',
  status: 'Ausgeliehen - Fällig am: 24.6.2119',
  availability: {
    days: 100,
    message: '100 days left'
  }
}, {
  library: 'library6',
  place: 'place6',
  status: 'verfügbar',
  availability: {
    days: -Number.MAX_SAFE_INTEGER,
    message: 'available'
  }
}]

describe('Copies.vue', () => {
  it('empty if loading', () => {
    const wrapper = shallowMount(Copies, {
      methods: {
        isDone: () => false
      }
    })

    expect(wrapper.find('div').exists()).toBeFalsy()
  })

  it('renders placeholder', () => {
    const wrapper = shallowMount(Copies, {
      computed: {
        data: () => ({
          copies: []
        })
      },
      methods: {
        isDone: () => true,
        getPreferredLibs: () => [],
        getNotPreferredLibsString: () => ''
      },
      stubs: {
        LibraryIcon: true,
        SignatureIcon: true
      }
    })

    expect(wrapper.find('.placeholder').text()).toEqual('Not available in any libraries.')
  })

  it('renders preferred and not preferred libraries', () => {
    const wrapper = shallowMount(Copies, {
      computed: {
        data: () => ({
          copies: []
        })
      },
      methods: {
        isDone: () => true,
        getPreferredLibs: () => instances,
        getNotPreferredLibsString: () => 'foo, bar, foo'
      },
      stubs: {
        LibraryIcon: true,
        SignatureIcon: true
      }
    })

    // name of library
    expect(wrapper.findAll('.not-available td').at(0).text()).toEqual(instances[0].library)
    // days overdue
    expect(wrapper.findAll('.not-available td').at(1).text()).toMatch(new RegExp('^.*days overdue$'))
    // library
    expect(wrapper.findAll('tr').at(1).findAll('td').at(0).text()).toEqual(instances[1].library)
    // signature (place)
    expect(wrapper.findAll('tr').at(1).findAll('td').at(1).text()).toMatch(new RegExp(instances[1].signature + '.*(' + instances[1].place + ')', 's'))
    // lost
    expect(wrapper.findAll('tr').at(2).findAll('td').at(1).text()).toEqual('lost')
    // unknown status
    expect(wrapper.findAll('tr').at(3).findAll('td').at(1).text()).toEqual(instances[3].availability.message)
    // days left
    expect(wrapper.findAll('tr').at(4).findAll('td').at(1).text()).toMatch(new RegExp('^.*days left$'))
    // no signature -> only place
    expect(wrapper.findAll('tr').at(5).findAll('td').at(1).text()).toEqual(instances[5].place)
    // non preferred libraries placeholder
    expect(wrapper.find('.placeholder > span:nth-child(3)').text()).toEqual('foo, bar, foo')
  })
})
