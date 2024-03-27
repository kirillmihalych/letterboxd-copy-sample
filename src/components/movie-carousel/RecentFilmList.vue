<template>
  <div>
    <div v-if="loading">Loading...</div>

    <div v-if="error">{{ error }}</div>

    <div v-if="movieList" class="movie-list" id="slider">
      <button class="btn-left" @click="slideLeft"><=</button>
      <FilmCard
        v-for="movie in movieList"
        :key="movie.id"
        :movie="movie"
        class="slide"
      />
      <button @click="slideRight" class="btn-right">=></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import FilmCard from './FilmCard.vue'
import type { IMovie } from '@/types'
import { onMounted, ref, watchEffect } from 'vue'
import { loadRecentMovies } from '@/api'

let movieList = ref<IMovie[] | null>(null)
const error = ref<string | null>(null)
const loading = ref(false)

onMounted(() => fetchMovies())

function slideRight() {
  ;(document.getElementById('slider') as HTMLElement).scrollLeft += 925
}

function slideLeft() {
  ;(document.getElementById('slider') as HTMLElement).scrollLeft -= 925
}

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

<style scoped>
.movie-list {
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 1s linear;
  overflow: hidden;
  scroll-behavior: smooth;
}

.btn-right {
  right: 5px;
  position: absolute;
}

.btn-left {
  left: 5px;
  position: absolute;
}
</style>
