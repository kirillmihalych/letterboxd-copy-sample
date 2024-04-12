<template>
  <div>{{ accountDetails?.username }}</div>
  <img :src="avatarUrl" alt="avatar" />
  <div v-for="movie in ratedMovies" :key="movie.id">
    <h3>{{ movie.title }}</h3>
    <p>My rating is {{ movie.rating }}</p>
  </div>
</template>

<script setup lang="ts">
import { getAccountDetails, loadRatedMovies } from '@/api/user'
import { onMounted, ref, watchEffect } from 'vue'
import type { IAccountDetails } from '@/interfaces/user-types'
import { getSessionFromLocalStorage } from '@/local-storage/getSession'
import type { IRatedMovie } from '@/interfaces/user-types'

const accountDetails = ref<IAccountDetails | null>(null)
const error = ref<string | null>()
const loading = ref(false)
const avatarUrl = ref('')

const ratedMovies = ref<IRatedMovie[] | null>(null)
const ratedMoviesError = ref<string | null>(null)
const ratedMoviesLoading = ref(false)

const session_id = getSessionFromLocalStorage()

const fetchAccountDetails = async (sessionID: string) => {
  error.value = null
  accountDetails.value = null

  try {
    loading.value = true
    accountDetails.value = await getAccountDetails(sessionID)
    if (accountDetails.value) {
      avatarUrl.value = `https://image.tmdb.org/t/p/w200${accountDetails.value.avatar.tmdb.avatar_path}`
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message.toString()
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (session_id) {
    fetchAccountDetails(session_id)
  }
})

const fetchRatedMovies = async (id: number) => {
  try {
    ratedMoviesLoading.value = true
    ratedMovies.value = (await loadRatedMovies(id)).results
  } catch (err: unknown) {
    if (err instanceof Error) {
      ratedMoviesError.value = err.message.toString()
    }
  } finally {
    ratedMoviesLoading.value = false
  }
}

watchEffect(() => {
  fetchRatedMovies(accountDetails.value?.id as number)
})
</script>

<style scoped></style>
