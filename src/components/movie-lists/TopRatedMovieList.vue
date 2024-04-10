<template>
  <div class="movie-list-top-rated">
    <MovieImgCard
      v-for="movie in props.movies"
      :key="movie.id"
      :movie="movie"
      :width="imgWidth"
      :height="imgHeight"
    />
  </div>
</template>

<script setup lang="ts">
import type { IMovie } from '@/interfaces/movie-types'
import MovieImgCard from '../movie-cards/MovieImgCard.vue'

interface ITopRatedMovieList {
  movies: IMovie[] | null
}

const props = defineProps<ITopRatedMovieList>()

const imgWidth = 250 + 'px'
const imgHeight = 375 + 'px'
</script>

<style scoped>
.movie-list-top-rated {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
  gap: 1rem;
}
</style>
