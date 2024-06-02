<template>
  <div class="movies-container">
    <ListMovieCard
      :movie="movie"
      v-for="movie in props.movies"
      :key="movie.id"
      @update-list-items="updateListItems"
    />
  </div>
</template>

<script setup lang="ts">
import type { IMovie } from '@/interfaces/movie-types'
import ListMovieCard from './ListMovieCard.vue'

interface IListMovies {
  movies: IMovie[] | undefined
}

const props = defineProps<IListMovies>()

const emits = defineEmits<{
  (e: 'update-list-items'): void
}>()
const updateListItems = () => emits('update-list-items')
</script>

<style scoped>
.movies-container {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

@media (min-width: 540px) {
  .movies-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) {
  .movies-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 912px) {
  .movies-container {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
