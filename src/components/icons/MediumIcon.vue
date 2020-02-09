<template>
    <i v-if='getIconClasses != ""' :class='getIconClasses'></i>
</template>

<script>
import { mediumIcons } from '../../utils/constants.js'

export default {
  data () {
    return {
      mediumIcons: mediumIcons
    }
  },
  props: {
    medium: {
      type: String,
      required: true
    }
  },
  computed: {
    getIconClasses () {
      let icons = this.mediumIcons.filter(m => m.text.indexOf(this.medium) !== -1)
      if (icons.length === 0) {
        console.log('No icon found for medium', this.medium)
        return ''
      } else {
        return icons[0].icon
      }
    }
  }
}
</script>
