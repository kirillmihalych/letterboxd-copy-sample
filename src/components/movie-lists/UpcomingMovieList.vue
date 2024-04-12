<template>
  <div class="upcoming-movie-list">
    <FilmCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    <!-- <MovieImgCard
      v-for="movie in movies"
      :key="movie.id"
      :movie="movie"
      :width="imgWidth"
      :height="imgHeight"
    /> -->
  </div>
</template>

<script setup lang="ts">
import type { IMovie } from '@/interfaces/movie-types'
import FilmCard from '../movie-cards/FilmCard.vue'
import MovieImgCard from '../movie-cards/MovieImgCard.vue'

interface IUpcomingMovieList {
  movies: IMovie[] | null
}

const props = defineProps<IUpcomingMovieList>()
const movies = props.movies

const imgWidth = 250 + 'px'
const imgHeight = 375 + 'px'
</script>

<style scoped>
.upcoming-movie-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
  gap: 1rem;
}
</style>
