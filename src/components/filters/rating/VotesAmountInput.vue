<template>
  <div class="votes-amount-slider">
    <div class="selectBox" @click="doToggleShowSlider">
      <select>
        <option>Votes</option>
      </select>
      <div class="overSelect"></div>
    </div>
    <div
      class="range-input"
      v-show="isSliderShowed"
      @mouseleave="() => (isSliderShowed = false)"
    >
      <p>Minimum user votes</p>
      <input
        type="range"
        min="0"
        max="300"
        step="1"
        @change="onRangeUpdate"
        v-model="showedRangeValue"
      />
      <h3>{{ showedRangeValue }}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { debounce } from 'lodash-es'
import useFiltersStore from '@/stores/filters'
import { ref } from 'vue'
const filtersStore = useFiltersStore()
const initRangeValue = filtersStore.selectedOptions.min_amount_votes
const showedRangeValue = ref(initRangeValue)

const isSliderShowed = ref(false)

const doToggleShowSlider = () => {
  isSliderShowed.value = !isSliderShowed.value
}

const onRangeUpdate = debounce((e: Event) => {
  const event = e.target as HTMLInputElement
  filtersStore.selectedOptions.min_amount_votes = event.value
}, 300)
</script>

<style scoped>
.votes-amount-slider {
  width: 75px;
}

.selectBox {
  position: relative;
}

.selectBox select {
  width: 100%;
  font-weight: bold;
}

.overSelect {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.range-input {
  position: absolute;
  background: #222;
  color: lightgray;
  width: 250px;
  text-align: center;
  right: 45px;
}
</style>
