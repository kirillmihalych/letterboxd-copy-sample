<template>
  <div>
    <MovieImgCard v-for="movie in movieList" :key="movie.id" :movie="movie" />
  </div>
</template>

<script setup lang="ts">
import type { IMovie } from '@/types'
import MovieImgCard from './MovieImgCard.vue'

interface IPopularMovieListProps {
  movieList: IMovie[] | null
}

const props = defineProps<IPopularMovieListProps>()
const movieList = props.movieList
// movieimg card and more detailed card
// by genre
// by decades
// ====================================
// additional
// slider filter by vote amount and score
// can customly set dates interval and filter by it
</script>

<style scoped></style>
