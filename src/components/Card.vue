<template>
    <router-link
        :to='"/" + wrapper + "Wrapper/Preview"'
        :class='["card", wrapper.toLowerCase(), { "not-available": wrapper === "Bookmarks" && row.availability.message !== "available" }]'
        tag='div'
        @click.left.native='fetchDetails(row.identifier)' >
        <img :src='row.img ? row.img : ""' />
        <div class='info'>
            <div class='title'>
                <MediumIcon :medium='row.medium'/>
                {{ sanitizeString('Titel', row.title) }} ({{ row.medium }})
            </div>
            <div class='subtitle'>
                {{ row.name }}
                <template v-if='row.year'>
                    - {{ row.year }}
                </template>
            </div>
        </div>
        <BookmarkButtonIcon
            v-if='wrapper === "Search"'
            :identifier='row.identifier' />
        <span v-else>
            {{ row.availability.message }}
        </span>
    </router-link>
</template>

<script>
import BookmarkButtonIcon from './icons/BookmarkButtonIcon.vue'
import MediumIcon from './icons/MediumIcon.vue'
import { mapActions } from 'vuex'
import { sanitizeDetail } from '../utils/string.js'

export default {
  components: {
    BookmarkButtonIcon,
    MediumIcon
  },
  props: {
    row: {
      type: Object,
      required: true
    },
    wrapper: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions([
      'fetchDetails'
    ]),
    // removes unncessary infos from strings
    sanitizeString (key, value) {
      return sanitizeDetail(key, value)
    }
  }
}
</script>

<style scoped>
.card {
    background-color: #FFF;
    margin-bottom: 16px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.15);
    padding: 8px;
    cursor: pointer;
    display: grid;
    grid-column-gap: 16px;
}

.card.not-available {
    color: var(--color-3);
}

.card.card.not-available img{
    opacity: .7;
}

.card.search {
    grid-template-columns: 90px 1fr 60px;
}

.card.bookmarks {
    grid-template-columns: 90px 1fr 155px;
}

.card:hover,
.card:active {
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
}

.info {
    grid-column: 2 / 3;
    padding-top: 4px;
}

.title {
    padding-bottom: 4px;
}

.subtitle {
    font-size: 12px;
    color: #808080;
}

img {
    width: 100%;
    padding-right: 16px;
    min-width: 90px;
    min-height: 50px;
    grid-column: 1 / 2;
}

svg,
span {
    grid-column: 3 / 4;
    padding: 24px;
    text-align: right;
}
</style>
