<template>
  <div class="votes-amount-slider">
    <div class="selectBox" @click="doToggleShowSlider">
      <select>
        <option disabled>Set votes amount/option></option>
      </select>
      <div class="overSelect"></div>
    </div>
    <div
      class="range-input"
      v-show="isSliderShowed"
      @mouseleave="() => (isSliderShowed = false)"
    >
      <input
        type="range"
        min="0"
        max="500"
        step="1"
        :value="defaultValue"
        @change="(e) => setValue(e)"
      />
      <h3>{{ defaultValue }}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const emits = defineEmits<{
  (e: 'set-votes-amount', votes_amount: string): void
}>()

const isSliderShowed = ref(false)

const doToggleShowSlider = () => {
  isSliderShowed.value = !isSliderShowed.value
}

const defaultValue = ref(250)

const setValue = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  emits('set-votes-amount', value)
}
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
}
</style>
