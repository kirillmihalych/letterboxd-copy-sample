<template>
  <div v-if="loading">loading...</div>
  <div v-if="error">error</div>
  <div v-if="topRatedMovies">
    <TopRatedMovieList :movies="topRatedMovies" />
  </div>
</template>

<script setup lang="ts">
import TopRatedMovieList from '@/components/filters/TopRatedMovieList.vue'
import { loadTopRatedMovies, loadUpcomingMovies } from '@/api'
import { onMounted, ref } from 'vue'
import type { IMovie } from '@/types'

const topRatedMovies = ref<IMovie[] | null>(null)
const error = ref<string | null>(null)
const loading = ref(false)

onMounted(() => {
  fetchTopRatedMovies()
})

const fetchTopRatedMovies = async () => {
  error.value = null
  topRatedMovies.value = null

  try {
    loading.value = true
    topRatedMovies.value = await loadTopRatedMovies()
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
