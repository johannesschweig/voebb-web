import Vue from 'vue'
import App from './components/App.vue'
import store from './store/store.js'
import router from './router.js'
import pg from 'pg'

Vue.config.productionTip = false

// console.log('User storage in', require('electron-json-storage').getDefaultDataPath())

const client = new pg({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});


/* eslint-disable no-new */
new Vue({
  store,
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app')
