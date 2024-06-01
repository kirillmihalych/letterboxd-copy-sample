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

const comps = [FavoriteButton, WatchlistButton, RateMovieButton, ListsButton]

interface IUserActionsMenu {
  movie_id: number
  release: string
  vote_average: number
  vote_count: number
}

const props = defineProps<IUserActionsMenu>()

const isUserAuthorized = getSessionFromLocalStorage() ? true : false
</script>

<style scoped>
.list-actions {
  height: 2.25rem;
  /* width: 100%; */
  margin: 0 auto;
  display: grid;
  background: rgba(0, 0, 0, 65%);
  grid-template-columns: repeat(4, 1fr);
}

button {
  background: inherit;
  color: inherit;
}
</style>
