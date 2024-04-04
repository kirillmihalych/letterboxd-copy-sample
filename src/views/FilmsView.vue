<script setup lang="ts">
import MovieTrendList from '@/components/movie-carousel/MovieTrendList.vue'
import SearchMovie from '@/components/search/SearchMovie.vue'
import MovieNavbar from '@/components/filters/MovieNavbar.vue'
import MovieTrailersCarousel from '@/components/movie-carousel/MovieTrailersCarousel.vue'

import type { IMovie } from '@/types'
import { onMounted, ref } from 'vue'
import { loadTrendingToday } from '@/api'

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
    <div v-if="loading">Loading...</div>

    <div v-if="error">{{ error }}</div>
    <div v-if="movieList">
      <MovieTrendList :movieList="movieList" />
    </div>
  </main>
</template>

<style scoped>
.films-view-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}
</style>
