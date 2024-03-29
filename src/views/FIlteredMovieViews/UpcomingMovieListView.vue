<template>
  <div v-if="loading">loading...</div>
  <div v-if="error">error...</div>
  <div v-if="upcomingMovies">
    <UpcomingMovieList :movies="upcomingMovies" />
  </div>
</template>

<script setup lang="ts">
import type { IMovie } from '@/types'
import UpcomingMovieList from '../../components/filters/UpcomingMovieList.vue'
import { onMounted, ref } from 'vue'
import { loadUpcomingMovies } from '@/api'

const upcomingMovies = ref<IMovie[] | null>(null)
const error = ref<string | null>(null)
const loading = ref(false)

onMounted(() => {
  fetchUpcomingMovies()
})

const fetchUpcomingMovies = async () => {
  upcomingMovies.value = null
  error.value = null
  try {
    loading.value = true
    upcomingMovies.value = await loadUpcomingMovies()
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value =
        err.message.toString() + ' ' + 'Возможно, у Вас выключен VPN.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped></style>
