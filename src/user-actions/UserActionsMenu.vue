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
              :is-watchlist="isWatchlist"
              :is-rated="isRated"
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
import { onMounted, ref } from 'vue'

const comps = [FavoriteButton, WatchlistButton, RateMovieButton, ListsButton]

interface IUserActionsMenu {
  movie_id: number
  release: string
  vote_average: number
  vote_count: number
}

const props = defineProps<IUserActionsMenu>()
const emits = defineEmits<{
  (e: 'update-watchlist-status', status: boolean): void
  (e: 'update-favorites'): void
  (e: 'update-rated'): void
}>()

const isUserAuthorized = getSessionFromLocalStorage() ? true : false

const isLoading = ref(false)
const isFavorite = ref(false)
const isWatchlist = ref(false)
const isRated = ref(false)

const getAccountStateHandler = async () => {
  try {
    isLoading.value = true
    const response = await getAccountState(props.movie_id)
    isFavorite.value = response.favorite
    isWatchlist.value = response.watchlist
    isRated.value = response.rated ? true : false
  } catch (err) {
    if (err instanceof Error) {
      console.log('Error in getting an account state' + err.message.toString())
    }
  } finally {
    isLoading.value = false
    console.log(isFavorite.value, isWatchlist.value, isRated.value)
  }
}

onMounted(() => {
  getAccountStateHandler()
})
</script>

<style scoped>
.list-actions {
  height: 2.25rem;
  /* width: 100%; */
  margin: 0 auto;
  display: grid;
  background: rgba(0, 0, 0, 65%);
  grid-template-columns: repeat(4, 1fr);
  border-radius: var(--radius);
}

button {
  background: inherit;
  color: inherit;
}
</style>
