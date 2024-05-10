<template>
  <div>
    <h1>wathclist list</h1>
    <MovieProfileCard
      v-for="movie in props.movies"
      :key="movie.id"
      :movie="movie"
    />
  </div>
</template>

<script setup lang="ts">
import type { IRatedMovie } from '@/interfaces/account-types'
import MovieProfileCard from '../movie-cards/MovieProfileCard.vue'

interface IWatchlistListProps {
  movies: IRatedMovie[] | null
}

const props = defineProps<IWatchlistListProps>()
</script>

<style scoped></style>
