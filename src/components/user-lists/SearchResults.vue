<template>
  <div v-if="props.isLoading" class="loading-error-handle-class">
    <SpinnerComp />
  </div>
  <div v-if="props.items?.length === 0" class="loading-error-handle-class">
    <p>There is no results by your query.</p>
  </div>
  <div
    v-for="item in props.items"
    :key="item.id"
    class="search-results-container"
  >
    <slot name="item" :item="item"></slot>
  </div>
</template>

<script setup lang="ts">
import SpinnerComp from '../error-handling/SpinnerComp.vue'

interface ISearchResult {
  items: any[] | null
  isLoading: boolean
  error: string | null
}

const props = defineProps<ISearchResult>()
</script>

<style scoped>
.loading-error-handle-class {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180px;
}
</style>
