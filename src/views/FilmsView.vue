<script setup lang="ts">
import SpinnerComp from '@/components/error-handling/SpinnerComp.vue'
import MovieTrendList from '@/components/movie-carousel/MovieTrendList.vue'
import SearchMovie from '@/components/movie-search/SearchMovie.vue'
import MovieNavbar from '@/components/filters/MovieNavbar.vue'

import type { IMovie } from '@/interfaces/movie-types'
import { onMounted, ref } from 'vue'
import { loadTrendingToday } from '@/api/movie'

const movieList = ref<IMovie[] | null>(null)
const movieIDs = ref<number[] | null>()
const error = ref<string | null>(null)
const loading = ref(false)

const getMovieID = (): void => {
  movieIDs.value = movieList.value?.map(({ id }): number => id)
}

onMounted(() => fetchTrendMovies())

const fetchTrendMovies = async () => {
  error.value = null
  movieList.value = null
  loading.value = true

  try {
    movieList.value = await loadTrendingToday()
    getMovieID()
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message.toString() + ' Возможно, у Вас выключен VPN.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <header class="films-view-header">
    <MovieNavbar />
    <SearchMovie />
  </header>
  <main>
    <div class="fetch-handle-container" v-if="loading">
      <SpinnerComp />
    </div>
    <div v-if="error">{{ error }}</div>
    <div v-if="movieList">
      <MovieTrendList :movieList="movieList" />
    </div>
  </main>
</template>

<style scoped>
.films-view-header {
  box-sizing: border-box;
  margin: 0 auto;
  width: 950px;
  padding: 0.25rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.fetch-handle-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 350px;
}
</style>
