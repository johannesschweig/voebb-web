<template>
    <div class='container'>
        <NavigationItem
            wrapper='SearchWrapper'
            label='Search'
            icon='SearchIcon' />
        <NavigationItem
            wrapper='BookmarksWrapper'
            label='Bookmarks'
            icon='BookmarkIcon' />
        <div></div>
        <NavigationItem
            wrapper='SettingsPage'
            label='Settings'
            icon='SettingsIcon' />
    </div>
</template>

<script>
import NavigationItem from './NavigationItem.vue'

export default {
  components: {
    NavigationItem
  }
}
</script>

<style scoped>

.container {
    display: grid;
    grid-template-rows: 60px 60px 1fr 60px;
    background-color: var(--color-2);
    height: 100%;
    position: fixed;
    z-index: 9;
}


</style>
