<template>
  <select v-model="filtersStore.selectedOptions.sort_by" class="sort-by">
    <option disabled value="">Sort by</option>
    <option value="popularity.desc">popularity</option>
    <option value="vote_average.desc">rating</option>
    <option value="vote_count.desc">vote amount</option>
    <option value="primary_release_date.desc">realese date desc</option>
    <option value="primary_release_date.desc.asc">realese date asc</option>
  </select>
</template>

<script setup lang="ts">
import useFiltersStore from '@/stores/filters'

const filtersStore = useFiltersStore()
</script>

<style scoped>
.sort-by {
  width: 75px;
}

.sort-by {
  font-weight: bold;
}

.sort-by option {
  text-transform: capitalize;
}
</style>
