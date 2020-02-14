<template>
    <BookmarkIcon
        :class="{ 'active': active }"
        @click.left.stop="toggleBookmark( {'active': active, 'identifier': identifier} )" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BookmarkIcon from '@/assets/bookmark.svg'

export default {
  components: {
    BookmarkIcon
  },
  props: {
    identifier: {
      type: String,
      required: true
    }
  },
  computed: {
    active () {
      return this.bookmarksList.indexOf(this.identifier) !== -1
    },
    ...mapGetters([
      'bookmarksList'
    ])
  },
  methods: mapActions([
    'toggleBookmark'
  ])
}
</script>

<style scoped>
svg {
    cursor: pointer;
}

svg * {
    stroke: var(--color-3);
}

svg:hover *,
svg:active *,
svg:focus * {
    stroke: var(--color-4);
}

svg.active * {
    stroke: var(--color-4);
    fill: var(--color-4);
}

svg.active:hover * {
  fill: none;
}
</style>
