<template>
  <div>
    <div v-if="loading">Loading...</div>

    <div v-if="error">{{ error }}</div>

    <div v-if="movieList">
      <FilmCard v-for="movie in movieList" :key="movie.id" :movie="movie" />
    </div>
  </div>
</template>

<script setup lang="ts">
import FilmCard from './FilmCard.vue'
import type { IMovie } from '@/types'
import { ref, watchEffect } from 'vue'
import { loadRecentMovies } from '../api'

let movieList = ref<IMovie[] | null>(null)
const error = ref<string | null>(null)
const loading = ref(false)

watchEffect(() => fetchMovies())

async function fetchMovies() {
  error.value = null
  movieList.value = null
  loading.value = true

  try {
    movieList.value = await loadRecentMovies()
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message.toString()
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped></style>
