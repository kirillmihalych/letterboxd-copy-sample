<template>
  <div v-for="movie in filterStore.discoveredMovieList">
    {{ movie.title }}
  </div>
</template>

<script setup lang="ts">
import useFiltersStore from '@/stores/filters'

const filterStore = useFiltersStore()
</script>

<style scoped></style>
