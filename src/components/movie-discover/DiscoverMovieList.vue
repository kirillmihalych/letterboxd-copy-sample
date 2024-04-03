<template>
  <MovieImgCard
    v-for="movie in filterStore.discoveredMovieList"
    :key="movie.id"
    :movie="movie"
  />
  <!-- <div v-for="movie in filterStore.discoveredMovieList">
    {{ movie.title }}
  </div> -->
</template>

<script setup lang="ts">
import useFiltersStore from '@/stores/filters'
import MovieImgCard from '../filters/MovieImgCard.vue'

const filterStore = useFiltersStore()
</script>

<style scoped></style>
