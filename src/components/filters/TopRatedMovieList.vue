<template>
  <header>
    <GenreList />
    <!-- <button @click="searchByFilters = true" :disabled="disableSearch">
      искать по выбранным фильтрам
    </button> -->
  </header>
  <div class="movie-list-top-rated">
    <MovieImgCard
      v-for="movie in props.movies"
      :key="movie.id"
      :movie="movie"
    />
  </div>
</template>

<script setup lang="ts">
import type { IMovie } from '@/types'
import MovieImgCard from '../movie-cards/MovieImgCard.vue'
import GenreList from './genres/GenreList.vue'

interface ITopRatedMovieList {
  movies: IMovie[] | null
}

const props = defineProps<ITopRatedMovieList>()
</script>

<style scoped>
.movie-list-top-rated {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  justify-content: center;
  align-items: center;
}
</style>
