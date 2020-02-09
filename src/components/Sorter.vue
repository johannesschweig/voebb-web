<template>
    <div>
        <span>Sort:</span>  
        <select
            :style='getWidth()'
            @change='$emit("set-sorting", $event.target.value)'>
            <option
                v-for='crit in criterions'
                :key='crit'
                :value='crit'
                :selected='crit === sorting' >
                {{ crit }}
            </option>
        </select>
    </div>
</template>

<script>
import { calculateWidth } from '../utils/string.js'

export default {
  props: {
    sorting: {
      type: String,
      required: true
    },
    criterions: {
      type: Array,
      required: true
    }
  },
  methods: {
    getWidth () {
      return calculateWidth(this.criterions)
    }
  }
}
</script>

<style scoped>
div {
  display: inline;
}

span {
  color: var(--color-4);
  font-size: 14px;
  margin-right: 2px;
}

select {
	display: inline;
	font-size: 14px;
  font-weight: 700;
	color: var(--color-4);
  /* Ignore the warning, this is important */
	height: 28px;
	max-width: 100%;
	box-sizing: border-box;
	margin: 0;
  border: none;
	border-radius: 4px;
	-moz-appearance: none;
	-webkit-appearance: none;
	appearance: none;
  background-color: white;
  background:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8' fill='#808080'><polygon points='0,0 8,0 4,4'/></svg>") no-repeat scroll 95% 60% transparent;
	background-repeat: no-repeat, repeat;
	background-position: right 4px top 65%, 0 0;
	background-size: .65em auto, 100%;
}

select::-ms-expand {
	display: none;
}

select:focus {
	box-shadow: none;
	outline: none;
}
</style>
