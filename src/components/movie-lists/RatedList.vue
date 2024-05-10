<template>
  <div class="rated-container">
    <!-- <FilmCard v-for="movie in movies" :key="movie.id" :movie="movie" /> -->
    <MovieProfileCard v-for="movie in movies" :key="movie.id" :movie="movie" />
  </div>
</template>

<script setup lang="ts">
import type { IRatedMovie } from '@/interfaces/account-types'
import FilmCard from '../movie-cards/FilmCard.vue'
import MovieProfileCard from '../movie-cards/MovieProfileCard.vue'

interface IRatedListProps {
  movies: IRatedMovie[] | null
}

const props = defineProps<IRatedListProps>()
</script>

<style scoped>
.rated-container {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0.5rem;
}
</style>
