<template>
    <i
        @click='clicked'
        class="fas fa-trash">
    </i>
</template>

<script>

export default {
  props: {
    identifier: {
      type: String,
      required: true
    }
  },
  methods: {
    clicked () {
      this.$store.dispatch('removeBookmark', this.identifier)
    }
  }
}
</script>

<style scoped>
i {
    cursor: pointer;
    opacity: .7;
}

i:hover,
i:focus,
i:active {
    color: darkred;
    opacity: 1;
}
</style>
