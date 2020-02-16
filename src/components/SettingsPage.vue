<template>
    <div class='container'>
        <h1>Settings</h1>
        <div class='text'>Select your preferred libraries:</div>
        <template v-for='(lib, index) in allLibraries'>
            <input type='checkbox'
                :key='index'
                :value='lib'
                v-model='libs'
                :class="{'checked': libs.indexOf(lib) != -1}"/>
            {{ getShortLibrary(lib) }}
            <br :key='index+1000'/>
        </template>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { allLibraries } from '../utils/constants.js'
import { shortenLibraryName } from '../utils/string.js'

export default {
  data () {
    return {
      allLibraries: allLibraries
    }
  },
  computed: {
    // list of preferred libraries
    libs: {
      set (val) {
        this.setLibraries(val)
      },
      get () {
        return this.$store.state.libraries
      }
    },
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    // get short name for library
    getShortLibrary (lib) {
      return shortenLibraryName(lib)
    },
    ...mapActions([
      'setLibraries'
    ])
  }
}
</script>

<style scoped>
.text {
    font-size: 16px;
    padding-bottom: 12px;
}

div {
    font-size: 12px;
}
</style>
