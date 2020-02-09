<template>
    <div class='root' >
        <SearchField />
        <SearchResults />
    </div>
</template>

<script>
import SearchField from './SearchField.vue'
import SearchResults from './SearchResults.vue'

export default {
  components: {
    SearchField,
    SearchResults
  }
}
</script>

<style scoped>
.root {
    display: grid;
    grid-template-rows: 108px 1fr;
    width: calc(100vw - 84px - 32px);
}

.root > div:nth-child(1) {
    padding-bottom: 24px;
}
</style>
