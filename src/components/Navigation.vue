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
            wrapper='LoginPage'
            label='Login'
            icon='AvatarIcon' />
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
    background-color: var(--color-2);
    position: fixed;
    z-index: 9;
}

@media only screen and (max-width: 600px) {
    .container {
        grid-template-columns: 32px 32px 1fr 32px;
        width: 100%;
    }
}

@media only screen and (min-width: 600px) {
  .container {
      grid-template-rows: 60px 60px 1fr 60px;
      height: 100%;
  }
}


</style>
