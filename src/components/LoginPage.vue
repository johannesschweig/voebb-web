<template>
    <div class='container'>
        <h1>Login</h1>
        <p>Login to save your bookmarks and settings for later</p>
        <span>Code</span>
        <input
          v-model='token'
          placeholder='Enter code here'
          @keyup.enter="clickLogin"/>
        <button @click='clickLogin'>Login</button>
        <p
          v-if='loginState.status === DONE'
          class='success'>
          ✔ Successfully logged in as user {{ loginState.user }}
        </p>
        <p
          v-else-if='loginState.status === FAILED'
          class='failure'>
          ✗ Login failed.
        </p>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { DONE, FAILED } from '@/utils/constants'

export default {
  data () {
    return {
      token: '',
      DONE,
      FAILED
    }
  },
  computed: mapState({
    loginState: state => state.login
  }),
  methods: {
    clickLogin() {
      if(this.token) {
        this.login(this.token)
      }
    },
    ...mapActions([
      'login',
      'readUserData'
    ])
  }
}
</script>

<style scoped>
span {
  margin-right: 8px;
}

.success,
.failure {
  opacity: .8;
}

.success {
  color: green;
}

.failure {
  color: red;
}
</style>
