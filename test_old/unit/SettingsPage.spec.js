import { shallowMount } from '@vue/test-utils'
import SettingsPage from '@/components/SettingsPage'
import { allLibraries } from '@/utils/constants'
import { shortenLibraryName } from '@/utils/string'

const preferred = ['Charlottenburg-Wilmersdorf: Adolf-Reichwein-Bibliothek', 'Charlottenburg-Wilmersdorf: Dietrich-Bonhoeffer-Bibliothek', 'Charlottenburg-Wilmersdorf: Eberhard-Alexander-Burgh-Bibliothek']

describe('SettingsPage.vue', () => {
  it('renders list of libraries', () => {
    const wrapper = shallowMount(SettingsPage, {
      computed: {
        libs: {
          get: () => preferred,
          set: () => {}
        }
      }
    })

    // FIXME input fields have no ending tags -> concatenating library names together
    let regex = new RegExp('^Select your preferred libraries:.*' + allLibraries.map(lib => shortenLibraryName(lib)).join('.*') + '$', 's')
    expect(wrapper.find(SettingsPage).text()).toMatch(regex)
    // FIXME add test to check checked status (computed property getter makes this hard)
    //   preferred.forEach((lib, index) => {
    //       expect(wrapper.find('input[value="' + lib + '"]').attributes('checked')).toEqual('checked')
    //       expect(wrapper.find('input[value="' + lib + '"]').html()).toEqual('checked')
    //   })
  })
})
