<template>
  <div>
    <MovieImgCard v-for="movie in movies" :key="movie.id" :movie="movie" />
  </div>
</template>

<script setup lang="ts">
import type { IMovie } from '@/types'
import MovieImgCard from './MovieImgCard.vue'

interface ITopRatedMovieList {
  movies: IMovie[] | null
}

const props = defineProps<ITopRatedMovieList>()
const movies = props.movies
</script>

<style scoped></style>
