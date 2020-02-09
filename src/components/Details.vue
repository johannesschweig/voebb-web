<template>
    <table
        v-if='data.details.length != 0'
        class='table'>
        <tbody>
            <tr
              v-for='(value, key) in getDetails'
              :key='key' >
                    <td> {{ key }} </td>
                    <td> {{ sanitizeString(key, value) }} </td>
            </tr>
        </tbody>
    </table>
    <span
        v-else
        class='placeholder'>
        {{ loading.msg }}
    </span>
</template>

<script>
import { mapState } from 'vuex'
import { sanitizeDetail } from '../utils/string.js'

export default {
  computed: {
    ...mapState({
      data: state => state.preview.data,
      loading: state => state.preview.loading
    }),
    // return details object without img
    getDetails () {
      return Object.keys(this.data.details)
        .filter(key => key !== 'img')
        .reduce((value, key) => {
          value[key] = this.data.details[key]
          return value
        }, {})
    }
  },
  methods: {
    // removes unncessary infos from strings
    sanitizeString (key, value) {
      return sanitizeDetail(key, value)
    }
  }
}
</script>

<style scoped>
td {
    vertical-align: top;
    padding-bottom: 14px;
}

tr td:nth-child(1) {
    font-weight: 500;
    padding-right: 60px;
}

tr td:nth-child(2) {
    font-weight: 300;
}
</style>
