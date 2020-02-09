<template>
    <keep-alive>
        <transition
            :name='transitionName'
            @enter='scrollAfterEnter' >
            <router-view />
        </transition>
    </keep-alive>
</template>

<script>
import { PREVIEW, PAGE, SEARCH_WRAPPER, BOOKMARKS_WRAPPER } from '../utils/constants.js'
import { mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
      transitionName: ''
    }
  },
  computed: {
    ...mapGetters([
      'getSearchIdentifiers',
      'getBookmarksIdentifiers'
    ]),
    ...mapState({
      previewIdentifier: state => state.preview.data.identifier
    })
  },
  methods: {
    scrollAfterEnter () {
      // returning from preview
      if (this.transitionName === 'slide-right') {
        // check which entry to return to
        if (this.$route.path === '/' + SEARCH_WRAPPER + '/' + PAGE) {
          // check which entry to return to
          let index = this.getSearchIdentifiers.indexOf(this.previewIdentifier) + 1
          document.querySelector('#app > div.root > div:nth-child(2) > div:nth-child(' + index + ')').scrollIntoView()
          document.getElementById('app').scrollTop -= 8
        } else if (this.$route.path === '/' + BOOKMARKS_WRAPPER + '/' + PAGE) {
          // check which entry to return to
          let index = this.getBookmarksIdentifiers.indexOf(this.previewIdentifier) + 1
          // if 0, the bookmark was just removed
          if (index > 0) {
            document.querySelector('#app > div:nth-child(3) > div:nth-child(3) > div:nth-child(' + index + ')').scrollIntoView()
            document.getElementById('app').scrollTop -= 8
          }
        }
      } else if (this.transitionName === 'slide-left') { // going to preview
        // scroll to top
        document.getElementById('app').scrollTop = 0
      }
    }
  },
  // check what transition to choose
  watch: {
    '$route' (to, from) {
      let prior = from.path.slice(1).split('/')
      let after = to.path.slice(1).split('/')
      // top level navigation
      if (prior[0] !== after[0]) {
        this.transitionName = ''
        document.getElementById('app').scrollTop = 0
      } else {
        // sub level navigation
        if (after[1] === PREVIEW) {
          this.transitionName = 'slide-left'
        } else {
          this.transitionName = 'slide-right'
        }
      }
    }
  }
}
</script>


<style scoped>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
    transition: transform .4s ease-in-out;
}

.slide-right-enter,
.slide-left-leave-to {
    transform: translateX(-100%);
}

.slide-left-enter,
.slide-right-leave-to {
    transform: translateX(100%);
}
</style>