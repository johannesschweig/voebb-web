import Vue from 'vue'
import App from './components/App.vue'
import store from './store/store.js'
import router from './router.js'

Vue.config.productionTip = false

// console.log('User storage in', require('electron-json-storage').getDefaultDataPath())

/* eslint-disable no-new */
new Vue({
  store,
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app')
