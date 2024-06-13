<template>
  <div class="component-container">
    <div v-if="!isUserAuthorized" class="user-not-authorized">
      You are not an authorized.
    </div>
    <div v-if="isUserAuthorized" class="user-actions-container">
      <div class="list-actions">
        <FancyButtonWrapper v-for="(comp, idx) in comps" :key="idx">
          <template #fancy-button-slot>
            <component
              :is="comp"
              :movie_id="props.movie_id"
              :release="release"
              :vote_average="props.vote_average"
              :vote_count="props.vote_count"
              :is-favorite="isFavorite"
              @update-is-favorite="(isFav) => setIsFavorite(isFav as boolean)"
              :is-watchlist="isWatchlist"
              @update-is-watchlist="(isWatch) => setIsWatchlist(isWatch as boolean)"
              :is-rated="isRated"
              :rating="rating"
              @update-is-rated="(isRated) => setIsRated(isRated as boolean)"
            />
          </template>
        </FancyButtonWrapper>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FavoriteButton from './FavoriteButton.vue'
import WatchlistButton from './WatchlistButton.vue'
import ListsButton from './ListsButton.vue'
import RateMovieButton from './RateMovieButton.vue'
import { getSessionFromLocalStorage } from '@/local-storage/getSession'
import FancyButtonWrapper from './FancyButtonWrapper.vue'
import getAccountState from '@/api/account/getAccountState'
import { ref, watchEffect } from 'vue'

const comps = [FavoriteButton, WatchlistButton, RateMovieButton, ListsButton]

interface IUserActionsMenu {
  movie_id: number
  release: string
  vote_average: number
  vote_count: number
}

const props = defineProps<IUserActionsMenu>()

const isUserAuthorized = getSessionFromLocalStorage() ? true : false

const isLoading = ref(false)
const isFavorite = ref(false)
const setIsFavorite = (isFav: boolean) => {
  isFavorite.value = isFav
}
const isWatchlist = ref(false)
const setIsWatchlist = (isWatch: boolean) => {
  isWatchlist.value = isWatch
}
const isRated = ref(false)
const rating = ref()
const setIsRated = (is_rated: boolean) => {
  isRated.value = is_rated
  if (is_rated === false) {
    rating.value = null
  }
}

const getAccountStateHandler = async () => {
  try {
    isLoading.value = true
    const response = await getAccountState(props.movie_id)
    isFavorite.value = response.favorite
    isWatchlist.value = response.watchlist
    isRated.value = response.rated ? true : false
    rating.value = response.rated.value
  } catch (err) {
    if (err instanceof Error) {
      console.log('Error in getting an account state' + err.message.toString())
    }
  } finally {
    isLoading.value = false
    console.log(isFavorite.value, isWatchlist.value, isRated.value)
  }
}

watchEffect(() => {
  getAccountStateHandler()
})
</script>

<style scoped>
.list-actions {
  height: 2.25rem;
  margin: 0 auto;
  display: grid;
  background: rgba(0, 0, 0, 65%);
  grid-template-columns: repeat(4, 1fr);
  border-radius: var(--radius);
}

.user-not-authorized {
  background: var(--snow-white);
  padding: 0.25rem 0.5rem;
  border: 2px solid black;
}

button {
  background: inherit;
  color: inherit;
}
</style>
