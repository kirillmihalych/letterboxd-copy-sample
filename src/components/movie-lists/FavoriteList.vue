<template>
  <div>
    <h1>favorite movies</h1>
    <MovieProfileCard
      v-for="movie in props.movies"
      :key="movie.id"
      :movie="movie"
    />
  </div>
</template>

<script setup lang="ts">
import type { IRatedMovie } from '@/interfaces/user-types'
import MovieProfileCard from '../movie-cards/MovieProfileCard.vue'

interface IFavoriteListProps {
  movies: IRatedMovie[] | null
}

const props = defineProps<IFavoriteListProps>()
</script>

<style scoped></style>
