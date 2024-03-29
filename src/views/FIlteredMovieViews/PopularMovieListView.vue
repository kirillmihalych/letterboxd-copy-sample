<template>
  <div v-if="loading">loading ...</div>
  <div v-if="error">{{ error }}</div>

  <div v-if="popularMovieList">
    <PopularMovieList :movieList="popularMovieList" />
  </div>
</template>

<script setup lang="ts">
import PopularMovieList from '@/components/filters/PopularMovieList.vue'
import { loadPopularMovies, loadVideoById } from '@/api'
import type { IMovie } from '@/types'
import { onMounted, ref } from 'vue'

onMounted(() => {
  fetchPopularMovieList()
})

const popularMovieList = ref<IMovie[] | null>(null)
const error = ref<string | null>(null)
const loading = ref(false)

const fetchPopularMovieList = async () => {
  popularMovieList.value = null
  error.value = null

  try {
    loading.value = true
    popularMovieList.value = await loadPopularMovies()
    await loadVideoById(634492)
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value =
        err.message.toString() + ' ' + 'Возможно, у вас выключен VPN.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped></style>
