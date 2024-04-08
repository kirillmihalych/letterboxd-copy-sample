<template>
  <div v-if="movieList" class="movie-list" id="slider">
    <FilmCard
      v-for="movie in movieList"
      :key="movie.id"
      :movie="movie"
      class="slide"
    />
  </div>
</template>

<script setup lang="ts">
import FilmCard from '../movie-cards/FilmCard.vue'
import type { IMovie } from '@/types'

interface IMovieTrendList {
  movieList: IMovie[] | null
}

const props = defineProps<IMovieTrendList>()
const movieList = props.movieList
</script>

<style scoped>
.movie-list {
  box-sizing: border-box;
  width: 950px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 1s linear;
  overflow-x: scroll;
  scroll-behavior: smooth;
}
</style>
