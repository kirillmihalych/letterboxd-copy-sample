<template>
  <button
    class="watchlist-btn"
    @click="toggleWatchlistHandler()"
    :class="{ watchlist: isWatchlist }"
  >
    {{ isLoading ? '...' : 'Watchlist' }}
  </button>
</template>

<script setup lang="ts">
import getAccountState from '@/api/account/getAccountState'
import toggleWatchlist from '@/api/account/toggleWatchlist'
import type { IWatchListMovie } from '@/interfaces/movie-types'
import { ref, watchEffect } from 'vue'
import getAccountID from '@/local-storage/getAccountID'

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
.watchlist-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  /* width: 78px;
  padding: 1rem; */
  border: none;
  background: darkgrey;
  text-transform: capitalize;
}

.watchlist-btn:hover {
  cursor: pointer;
  background: lightgrey;
}

.watchlist {
  background: #ac94f4;
}

.watchlist:hover {
  background: #651fff;
}
</style>
