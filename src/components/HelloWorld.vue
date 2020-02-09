<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <button @click='getSession'>Get session</button>
    <p>Session: {{ session }}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      session: '123'
    }
  },
  methods: {
    getSession() {
      var request = require('request') 
      console.log('getting session')
      const landingPageOptions = {
        'method': 'GET',
        'url': 'https://voebb.de/aDISWeb/app?service=direct/0/Home/$DirectLink&sp=SPROD00',
        'headers': {
          'Upgrade-Insecure-Requests': '1',
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
        }
      }

      // const urlGoogle = 'https://www.google.de'

      // const options = {
      //   'method': 'GET',
      //   'url': 'https://cors-proxifier.herokuapp.com/',
      //   'headers': {
      //     'Target-Url': urlGoogle
      //   }
      // }

      var _this = this

      request('https://cors-anywhere.herokuapp.com/' + landingPageOptions.url, function(err, res, body) {
      // request('https://cors-anywhere.herokuapp.com/' + urlGoogle, function(err, res, body) {
        // retrieves session from html
        function getSession (html) {
          let start = html.indexOf('jsessionid=') + 'jsessionid='.length
          let end = html.indexOf('?', start)
          return html.substr(start, end - start)
        }
        _this.session = getSession(body)
        console.log('session', _this.session)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
