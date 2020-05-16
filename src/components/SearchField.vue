<template>
    <div class='container'>
        <h1>Search</h1>
        <div class='inputfield'>
            <input
                ref='input'
                placeholder='Search for books, cds...'
                @keyup.enter='search($refs.input.value)' />
        </div>
        <div
            class='grid'
            v-if='numberOfResults > 1'>
            <span>
                {{ getNumberOfResultsString }}
            </span>
            <MediumFilter
              :criterions='getCurrentMediaFilters' />
            <Sorter
                :sorting='sorterSorting'
                :criterions='SEARCH_PAGE_CRITERIONS'
                @set-sorting='(criterion) => setSorting({ page: SEARCH, criterion })' />
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Sorter from './Sorter.vue'
import MediumFilter from './MediumFilter.vue'
import { SEARCH, SEARCH_PAGE_CRITERIONS } from '../utils/constants.js'

export default {
  data () {
    return {
      SEARCH_PAGE_CRITERIONS,
      SEARCH
    }
  },
  components: {
    MediumFilter,
    Sorter
  },
  methods: mapActions([
    'search',
    'setSorting'
  ]),
  computed: {
    ...mapState({
      sorterSorting: state => state.search.sorting
    }),
    ...mapGetters([
      'numberOfResults',
      'getCurrentMediaFilters',
      'numberOfFilteredResults'
    ]),
    // returns a string for the number of results
    getNumberOfResultsString () {
      let fil = this.numberOfFilteredResults
      let all = this.numberOfResults
      if (fil === all) {
        return all + ' results'
      }
      return fil + '/' + all + ' results'
    }
  }
}
</script>

<style scoped>
.container {
  position: absolute;
  width: 100%;
}

h1 {
  display: inline-grid;
  margin-right: 40px;
}


.inputfield {
    width: 300px;
    display: inline-block;
    vertical-align: top;
}

.inputfield input {
    border: none;
    background-color: #fff;
    display: block;
    height: 32px;
    width: 100%;
    box-sizing: border-box;
    padding-left: 8px;
    font-size: 18px;
    border: 1px solid var(--color-2);
    border-radius: 2px;
    color: var(--color-4);
}

.inputfield input:focus,
.inputfield input:active {
    outline-width: 0;
    border: 1px solid var(--color-3);
}

.inputfield input::placeholder {
    font-size: 16px;
}

.inputfield svg {
    position: absolute;
    transform: scale(0.625);
}

.inputfield svg * {
    stroke: var(--color-3);
}

.grid {
  display: grid;
  grid-template-columns: 200px 1fr 200px 150px;
  align-items: center;
}

.grid > span:first-child {
  font-size: 14px;
  font-weight: 600;
}

.grid > div:nth-child(2) {
  grid-column: 3/4;
}

.grid > div:nth-child(3) {
  grid-column: 4/5;
}
</style>
