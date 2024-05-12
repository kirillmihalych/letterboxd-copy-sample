<template>
  <UserInfo @load="(id) => setAccountId(id)" />
  <!-- navbar -->
  <!-- generic list -->
  <FavoriteList :movies="favoriteMovies" />
  <RatedList :movies="ratedMovies" />
  <WatchlistList :movies="watchlistMovies" />
</template>

<script setup lang="ts">
import UserInfo from './UserInfo.vue'
import RatedList from '@/components/movie-lists/RatedList.vue'
import FavoriteList from '@/components/movie-lists/FavoriteList.vue'
import { loadRatedMovies } from '@/api/user'
import { ref, watchEffect } from 'vue'
import type { IRatedMovie } from '@/interfaces/account-types'
import { loadFavoriteMovies, loadWatchlistMovies } from '@/api/movie'
import WatchlistList from '@/components/movie-lists/WatchlistList.vue'

const account_id = ref<number | null>(null)
const setAccountId = (id: number) => {
  account_id.value = id
}

const ratedMovies = ref<IRatedMovie[] | null>(null)
const favoriteMovies = ref<IRatedMovie[] | null>(null)
const watchlistMovies = ref<IRatedMovie[] | null>(null)
const ratedMoviesError = ref<string | null>(null)
const ratedMoviesLoading = ref(false)

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
  fetchRatedMovies(account_id.value as number)
})
</script>

<style scoped></style>
