<template>
  <div v-for="movie in props.movies" :key="movie.id">
    <ListMovieCard :movie="movie" @update-list-items="updateListItems" />
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

<style scoped></style>
