<template>
    <div class='container'>
        <h1>Bookmarks</h1>
        <Sorter
          v-if='multipleBookmarksAvailable'
          class='sorter'
          :sorting='sorterSorting'
          :criterions='BOOKMARKS_PAGE_CRITERIONS'
          @set-sorting='(criterion) => setSorting({ page: BOOKMARKS, criterion })' />
        <div v-if='detailsAvailable' >
            <Card
                v-for='row in getBookmarksData'
                :key='row.identifier'
                :row='{
                    title: row.details["Titel"],
                    medium: row.details["Medienart"],
                    name: row.details["Verfasser"] || row.details["Person"],
                    year: row.details["Veröffentlichung"],
                    img: row.details.img,
                    availability: row.availability,
                    identifier: row.identifier
                  }'
                wrapper='Bookmarks' />
            <div class='last-updated'>
                <span class='placeholder'>Last updated:</span>
                <span class='placeholder'> {{ lastUpdated }}</span>
                <button @click='exportBookmarks'>Export bookmarks</button>
                <!-- <a href="data:application/octet-stream;charset=utf-16le;base64,Ym9va21hcmtzIGFyZSBncmVhdCB7fQ==" download='bookmarks-export.txt'>text file</a> -->
            </div>
        </div>
        <LoadingCircle
          v-else-if='loading.status === LOADING'
          :msg='loading.msg' />
        <span
            v-else
            class='placeholder'>
            {{ loading.msg }}
        </span>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Card from './Card.vue'
import Sorter from './Sorter.vue'
import LoadingCircle from './icons/LoadingCircle.vue'
import { LOADING, BOOKMARKS_PAGE_CRITERIONS, BOOKMARKS } from '../utils/constants.js'
import { exportBookmarksFile } from '../utils/file.js'

export default {
  components: {
    Card,
    LoadingCircle,
    Sorter
  },
  data () {
    return {
      BOOKMARKS_PAGE_CRITERIONS,
      BOOKMARKS,
      LOADING
    }
  },
  computed: {
    ...mapState({
      lastUpdated: state => state.bookmarks.lastUpdated,
      loading: state => state.bookmarks.loading,
      sorterSorting: state => state.bookmarks.sorting
    }),
    ...mapGetters([
      'detailsAvailable',
      'getBookmarksData',
      'multipleBookmarksAvailable'
    ])
  },
  methods: {
    ...mapActions([
      'setSorting'
    ]),
    // exports the bookmarks to a text file
    exportBookmarks () {
      exportBookmarksFile(this.getBookmarks)
    }
  }
}
</script>

<style scoped>
.container {
    width: calc(100vw - 84px - 32px);
}

.container > .sorter {
    float: right;
}

.last-updated {
    margin-top: 12px;
}

.last-updated button {
    margin-left: 4px;
}

i {
    padding-right: 2px;
}

h1 {
  display: inline-block;
}

.container > span.placeholder {
  display: block;
}
</style>
