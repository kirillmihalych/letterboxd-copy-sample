<template>
  <input type="range" min="0" max="300" step="1" @change="onRangeUpdate" />
</template>

<script setup lang="ts">
import { debounce } from 'lodash-es'
import useFiltersStore from '@/stores/filters'
const filtersStore = useFiltersStore()
const onRangeUpdate = debounce((e: Event) => {
  const event = e.target as HTMLInputElement
  filtersStore.selectedOptions.min_amount_votes = event.value
}, 300)
</script>

<style scoped></style>
