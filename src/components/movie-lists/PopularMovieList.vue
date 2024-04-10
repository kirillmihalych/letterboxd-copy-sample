<template>
  <div class="popular-movies-container">
    <MovieImgCard
      v-for="movie in movieList"
      :key="movie.id"
      :movie="movie"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script setup lang="ts">
import type { IMovie } from '@/interfaces/movie-types'
import MovieImgCard from '../movie-cards/MovieImgCard.vue'
import { ref } from 'vue'

interface IPopularMovieListProps {
  movieList: IMovie[]
}

const props = defineProps<IPopularMovieListProps>()
const movieList = props.movieList

const width = ref(275 + 'px')
const height = ref(385 + 'px')
</script>

<style scoped>
.popular-movies-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
  gap: 1rem;
}

.list-overview {
  width: 950px;
}

.title-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.filters-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
