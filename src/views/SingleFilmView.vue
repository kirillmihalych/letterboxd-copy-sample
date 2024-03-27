<template>
  <div v-if="loading">Loading...</div>

  <div v-if="error">{{ error }}</div>

  <div v-if="movie">
    <SingleMovie :movieDetails="movie" />
  </div>
</template>

<script setup lang="ts">
import { loadMovieById } from '@/api'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import SingleMovie from '@/components/single-movie/SingleMovie.vue'
import type { IMovie } from '@/types'
const movie = ref<IMovie | null>()
const loading = ref(false)
const error = ref<string | null>(null)
const route = useRoute()

const fetchMovieById = async () => {
  loading.value = true
  error.value = null
  movie.value = null
  try {
    movie.value = await loadMovieById(route.params.id as string)
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message.toString()
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => fetchMovieById())
</script>

<style scoped></style>
