<template>
  <div>{{ accountDetails?.username }}</div>
  <img :src="avatarUrl" alt="avatar" />
  <FavoriteList :movies="favoriteMovies" />
  <RatedList :movies="ratedMovies" />
  <WatchlistList :movies="watchlistMovies" />
</template>

<script setup lang="ts">
import RatedList from '@/components/movie-lists/RatedList.vue'
import FavoriteList from '@/components/movie-lists/FavoriteList.vue'
import { getAccountDetails, loadRatedMovies } from '@/api/user'
import { onMounted, ref, watchEffect } from 'vue'
import type { IAccountDetails } from '@/interfaces/user-types'
import { getSessionFromLocalStorage } from '@/local-storage/getSession'
import type { IRatedMovie } from '@/interfaces/user-types'
import { loadFavoriteMovies, loadWatchlistMovies } from '@/api/movie'
import WatchlistList from '@/components/movie-lists/WatchlistList.vue'

const accountDetails = ref<IAccountDetails | null>(null)
const error = ref<string | null>()
const loading = ref(false)
const avatarUrl = ref('')

const ratedMovies = ref<IRatedMovie[] | null>(null)
const favoriteMovies = ref<IRatedMovie[] | null>(null)
const watchlistMovies = ref<IRatedMovie[] | null>(null)
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
    favoriteMovies.value = (await loadFavoriteMovies(id)).results
    watchlistMovies.value = (await loadWatchlistMovies(id)).results
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
