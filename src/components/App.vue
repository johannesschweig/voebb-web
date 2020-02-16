<template>
    <div id='app'>
        <Navigation />
        <keep-alive>
            <router-view />
        </keep-alive>
    </div>
</template>

<script>
import Navigation from './Navigation.vue'
import { mapState } from 'vuex'
// import { benchmark } from './utils/benchmark'

export default {
  components: {
    Navigation,
  },
  computed: mapState({
    'currentPage': state => state.navigation.currentPage
  }),
  created () {
    // this.$store.dispatch('login', 't')
    // benchmark()
    // read in bookmarks from file
    // this.$store.dispatch('fakeReadUserData')
    // this.$store.dispatch('fakeSearch')
    // this.$store.dispatch('fakeFetchDetails')
    // this.$store.dispatch('search', 'braunau')
    // this.$store.dispatch('search', 'dittersdorf a e f g')
    // this.$store.dispatch('search', 'Die Gesellschaft des Zorns : Rechtspopulismus im globalen Zeitalter / Cornelia Koppetsch')
    // this.$store.dispatch('search', 'sams taschenbier')
  }
}
</script>

<style>
:root {
  --color-1: #f9f9f9;
  --color-2: #bcbab8;
  --color-3: #808080;
  --color-4: #333333;
}

i {
    opacity: .9;
}

.placeholder {
    font-size: 14px;
    font-weight: 300;
    opacity: .5;
    font-style: italic;
}

h1 {
    font-size: 30px;
    margin: 0;
    color: var(--color-4);
    padding-bottom: 16px;
}


.active-card {
    background-color: var(--color-2);
}

</style>

<style scoped>
#app {
    font-family: Lato, sans-serif;
    height: 100vh;
    width: 99vw;
}

#app > div:nth-child(2),
#app > div:nth-child(3) {
    position: absolute;
    left: 84px;
    top: 16px;
    margin-bottom: 16px;
}
</style>

