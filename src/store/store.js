import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import { INITIAL, SEARCH_PAGE_CRITERIONS, BOOKMARKS_PAGE_CRITERIONS, ALL } from '../utils/constants'

Vue.use(Vuex)

// initial state
const state = {
  search: {
    data: [], // { title: ..., name: ..., medium: ..., year: ..., img: ..., avail: ...}
    loading: {
      // status of the component: either initial, loading, done, error
      status: INITIAL,
      // message to the user
      msg: 'You have not searched for anything yet.'
    },
    sorting: SEARCH_PAGE_CRITERIONS[0], // most relevant
    filter: { label: ALL } // Filter for the search results { label: 'Digital', text: ["E-Book", "E-Learning", "E-Ressource", "E-Journal"], num: 12 }
  },
  preview: {
    data: {
      // identifier:
      details: [], // [{ "Medienart": "CD", "Art/Inhalt": "Biografie", "Titel": "E.T.A. Hoffmann : aus dem Leben eines skeptischen Phantasten ; [CD] / E.T.A. Hoffmann. Regie: Martina Boette-Sonner. Gelesen von Rüdiger Safranski. Musik von E.T.A. Hoffmann", "Person": "Hoffmann, E. T. A. [Textverfasser/in] Boette-Sonner, Martina [Regie] Safranski, Rüdiger [Sprecher/in]", "Veröffentlichung": "München: Der Hörverlag, 1998 Carl Hanser Verlag", "Umfang / Dauer": "3 CD", "Sprache": "Deutsch", "ISBN": "3-89584-558-2" }]
      copies: [], // [{ library: 'Charlottenburg...', 'orderStatus: 'Buch - Vormerkung möglich', place: 'Freihand', Signature: 'Pol 166', status: 'Ausgeliehen - Fällig am: 22.10.2019', availability: { days: 99, message: '99 days left' }}]
      availability: {} // { days: 0, message: '0 days left'}
    },
    loading: {
      status: INITIAL,
      msg: ''
    }
  },
  bookmarks: {
    lastUpdated: '',
    data: [
      // { identifier: 'AK123', details: [..], copies: [...], availability: { days: 0, message: '0 days left'} }
    ],
    loading: {
      status: INITIAL,
      msg: 'You have not added any bookmarks yet.'
    },
    sorting: BOOKMARKS_PAGE_CRITERIONS[0] // available
  },
  // list of preferred libraries
  libraries: [],
  login: {
    status: INITIAL,
    accessToken: '', // accessToken for dropbox
    user: '' // current user
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
