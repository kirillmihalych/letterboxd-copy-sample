<template>
  <button
    title="Save to watchlist"
    class="watchlist-btn"
    @click="toggleWatchlistHandler()"
    :class="{ watchlist: props.isWatchlist }"
  >
    <v-icon v-if="isLoading" icon="mdi-loading" class="loading" />
    <v-icon
      v-else-if="!isLoading && !isWatchlist"
      icon="mdi-bookmark-plus-outline"
    />
    <v-icon v-if="!isLoading && isWatchlist" icon="mdi-bookmark-plus" />
  </button>
</template>

<script setup lang="ts">
import toggleWatchlist from '@/api/account/toggleWatchlist'
import type { IWatchListMovie } from '@/interfaces/movie-types'
import { ref } from 'vue'
import getAccountID from '@/local-storage/getAccountID'
import { useUserStore } from '@/stores/user'

const user = useUserStore()
const account_id = getAccountID()

interface IWatchlistButton {
  movie_id: number
  isWatchlist: boolean
}

const props = defineProps<IWatchlistButton>()
const emits = defineEmits<{
  (e: 'update-is-watchlist', isWatch: boolean): void
}>()

const isLoading = ref(false)

const toggleWatchlistHandler = async () => {
  const WatchlistMovie: IWatchListMovie = {
    media_type: 'movie',
    media_id: props.movie_id,
    watchlist: !props.isWatchlist,
  }

  try {
    isLoading.value = true
    await toggleWatchlist(account_id, WatchlistMovie)
    user.fetchWatchlistTitles()
    emits('update-is-watchlist', !props.isWatchlist)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log('Error in toggling Watchlist' + err.message.toString())
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.watchlist {
  color: orange;
}

.watchlist-btn:hover {
  color: var(--snow-white);
  cursor: pointer;
  opacity: 0.85;
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
