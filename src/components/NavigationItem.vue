<template>
    <router-link :to='"/" + wrapper'>
        <component :is='icon' />
    </router-link>
</template>

<script>
import BookmarkIcon from '../assets/bookmark.svg'
import SearchIcon from '../assets/search.svg'
import SettingsIcon from '../assets/settings.svg'

export default {
  components: {
    BookmarkIcon,
    SearchIcon,
    SettingsIcon
  },
  props: {
    wrapper: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  }
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
a.router-link-active svg *{
    stroke: var(--color-4);
}

@media only screen and (max-width: 600px) {
    svg {
        scale: .75;
        padding: 4px;
    }
}

@media only screen and (min-width: 600px) {
    svg {
        width: 32px;
        padding: 14px;
    }
}

</style>
