<template>
    <div class='container'>
        <div
            v-if='data.identifier'
            class='grid'>
            <div :class='{ "no-image": !data.details.img }'>
                <router-link :to='"/" + getCurrentWrapper + "/Page"'>
                    <BackArrowIcon />
                </router-link>
                <img
                  v-if='data.details.img'
                  :src='data.details.img'>
                <h1>{{ data.details['Titel'] }}</h1>
                <BookmarkButtonIcon :identifier='data.identifier' />
                <LinkButtonIcon :identifier='data.identifier' />
            </div>
            <div
                v-if='data.details["Medienart"].slice(0,2) !== "E-"'
                class='navigation' >
                <router-link
                    :to='"/" + getCurrentWrapper + "/Preview/Details"'
                    tag='span' >
                    Details
                </router-link>
                <router-link
                    :to='"/" + getCurrentWrapper + "/Preview/Copies"'
                    tag='span' >
                    Copies
                </router-link>
            </div>
            <keep-alive>
                <router-view />
            </keep-alive>
        </div>
        <LoadingCircle
          v-else-if='isLoading()'
          :msg='loading.msg' />
    </div>
</template>

<script>
import BookmarkButtonIcon from './icons/BookmarkButtonIcon.vue'
import BackArrowIcon from '../assets/back-arrow.svg'
import MediumIcon from './icons/MediumIcon.vue'
import LoadingCircle from './icons/LoadingCircle.vue'
import LinkButtonIcon from './icons/LinkButtonIcon.vue'
import { mapState } from 'vuex'
import { LOADING } from '../utils/constants.js'

export default {
  components: {
    BookmarkButtonIcon,
    BackArrowIcon,
    LoadingCircle,
    LinkButtonIcon,
    MediumIcon
  },
  computed: {
    ...mapState({
      data: state => state.preview.data,
      loading: state => state.preview.loading
    }),
    getCurrentWrapper () {
      let path = this.$route.path.slice(1)
      return path.slice(0, path.indexOf('/'))
    }
  },
  methods: {
    // returns true if the component is currently fetching data
    isLoading () {
      return this.loading.status === LOADING
    }
  }
}
</script>

<style scoped>
.container {
    position: absolute;
    left: 84px;
    top: 16px;
    width: calc(100vw - 84px - 16px);
}

.grid {
    grid-row: 1 / 3;
    grid-column: 2 / 3;
}

.grid div:nth-child(1) {
    margin-bottom: 32px;
    display: grid;
    grid-template-columns: 32px 1fr 4fr 32px 32px;
    grid-column-gap: 12px;
}

.grid div.no-image:nth-child(1) {
    grid-template-columns: 32px 1fr 32px 32px;
}

.grid svg {
    cursor: pointer;
}

.container svg * {
    stroke: var(--color-3);
}

.container svg:hover *,
.container svg:active * {
    stroke: var(--color-4);
}

h1 {
    display: inline;
    font-weight: 300;
    vertical-align: top;
}

.no-image h1 {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.navigation {
    margin-bottom: 24px;
}

.navigation span {
    font-size: 18px;
    padding: 2px 9px;
    color: var(--color-3);
    margin-right: 12px;
    cursor: pointer;
}

span:hover,
span:active {
    color: var(--color-4);
}

span.router-link-active {
    border-width: 0 0 1px 0; 
    border-color: var(--color-4);
    border-style: solid;
    color: var(--color-4);
}

img {
  width: 100%;
}
</style>
