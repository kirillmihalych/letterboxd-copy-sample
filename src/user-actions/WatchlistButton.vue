<template>
  <button
    title="Save to watchlist"
    class="watchlist-btn"
    @click="toggleWatchlistHandler()"
    :class="{ watchlist: isWatchlist }"
  >
    <v-icon v-if="isLoading" icon="mdi-loading" class="loading" />
    <v-icon icon="mdi-eye" v-else="!isLoading" />
  </button>
</template>

<script setup lang="ts">
import getAccountState from '@/api/account/getAccountState'
import toggleWatchlist from '@/api/account/toggleWatchlist'
import type { IWatchListMovie } from '@/interfaces/movie-types'
import { ref, watchEffect } from 'vue'
import getAccountID from '@/local-storage/getAccountID'
import { useUserStore } from '@/stores/user'

const user = useUserStore()
const account_id = getAccountID()

interface IWatchlistButton {
  movie_id: number
}

const props = defineProps<IWatchlistButton>()
const isLoading = ref(false)
const isWatchlist = ref(false)

const getAccountStateHandler = async () => {
  try {
    isLoading.value = true
    isWatchlist.value = (await getAccountState(props.movie_id)).watchlist
    user.fetchWatchlistTitles()
  } catch (err) {
    if (err instanceof Error) {
      console.log('Error in getting an account state' + err.message.toString())
    }
  } finally {
    isLoading.value = false
  }
}

const toggleWatchlistHandler = async () => {
  const WatchlistMovie: IWatchListMovie = {
    media_type: 'movie',
    media_id: props.movie_id,
    watchlist: !isWatchlist.value,
  }

  try {
    isLoading.value = true
    await toggleWatchlist(account_id, WatchlistMovie)
    getAccountStateHandler()
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log('Error in toggling Watchlist' + err.message.toString())
    }
  }
}

watchEffect(() => {
  getAccountStateHandler()
})
</script>

<style scoped>
.watchlist {
  color: orange;
}

.watchlist-btn:hover {
  cursor: pointer;
  color: var(--snow-white);
}
.watchlist:hover {
  color: pink;
}

.loading {
  animation: spin 0.75s linear infinite;
  color: lightslategray;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
