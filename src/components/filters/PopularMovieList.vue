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
</script>

<style scoped></style>
