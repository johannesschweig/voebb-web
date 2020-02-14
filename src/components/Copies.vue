<template>
    <div v-if='isDone()'>
        <table
            v-if='getPreferredLibs().length != 0 '
            class='availability'>
            <tbody>
                <tr
                    v-for='(instance, index) in getPreferredLibs()' 
                    :key='index'
                    :class='{"not-available": instance.availability.message != "available" }' >
                    <td>
                        <LibraryIcon />
                        {{ getShortLibrary(instance.library) }}
                    </td>
                    <td v-if='instance.availability.message === "available"'>
                        <template v-if='instance.signature'>
                          <SignatureIcon />
                          {{ instance.signature }}
                          ({{ instance.place }})
                        </template>
                        <template v-else>
                          {{ instance.place }}
                        </template>
                    </td>
                    <td v-else>
                        {{ instance.availability.message }}
                    </td>
                </tr>
            </tbody>
        </table>
        <div
            v-if='getNotPreferredLibsString().length'
            class='placeholder'>
            <span>Available in:</span>
            <br />
            <span>
                {{ getNotPreferredLibsString() }}
            </span>
        </div>
        <span
            v-if='data.copies.length == 0'
            class='placeholder'>
            Not available in any libraries.
        </span>
    </div>
</template>

<script>
import LibraryIcon from '../assets/library.svg'
import SignatureIcon from '../assets/code.svg'
import { mapState, mapGetters } from 'vuex'
import { DONE } from '../utils/constants.js'
import { getDaysDue, shortenLibraryName } from '../utils/string.js'

export default {
  components: {
    LibraryIcon,
    SignatureIcon
  },
  computed: {
    ...mapState({
      data: state => state.preview.data,
      loading: state => state.preview.loading
    }),
    ...mapGetters([
      'getPreferredLibraries',
      'getNotPreferredCopiesString',
      'getPreferredCopies'
    ])
  },
  methods: {
    getDaysDueString (avail) {
      return getDaysDue(avail)
    },
    // returns a shorter name for the library
    getShortLibrary (library) {
      return shortenLibraryName(library)
    },
    // returns true if the component has finished fetching data
    isDone () {
      return this.loading.status === DONE
    },
    // returns a label with non preferred libraries
    getNotPreferredLibsString () {
      return this.getNotPreferredCopiesString
    },
    // returns a sorted list of copies from preferred libraries
    getPreferredLibs () {
      return this.getPreferredCopies
    }
  }
}
</script>

<style scoped>
table {
    font-size: 14px;
    font-weight: 300;
    margin-bottom: 60px;
}

td {
    padding-right: 32px;
}

svg {
    transform: scale(0.5);
    vertical-align: middle;
    /* hack so scaled svg does not occupy the same space as unscaled svg */
    margin: -4px;
}

svg * {
    stroke: var(--color-3);
    fill: var(--color-3);
}

.not-available {
  opacity: .6;
}
</style>
