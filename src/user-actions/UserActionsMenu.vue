<template>
  <div class="component-container">
    <div v-if="!isUserAuthorized" class="user-not-authorized">
      You are not an authorized.
    </div>
    <div v-if="isUserAuthorized" class="user-actions-container">
      <div class="list-actions">
        <FancyButtonWrapper v-for="(comp, idx) in comps" :key="idx">
          <template #fancy-button-slot>
            <component :is="comp" :movie_id="props.movie_id" />
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
}

const props = defineProps<IUserActionsMenu>()

const isUserAuthorized = getSessionFromLocalStorage() ? true : false
</script>

<style scoped>
.list-actions {
  height: 2.25rem;
  width: 100%;
  margin: 0 auto;
  display: grid;
  background: rgba(0, 0, 0, 65%);
  grid-template-columns: repeat(4, 1fr);
}

button {
  background: inherit;
  color: inherit;
}

/* .list-actions div {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: slategray;
}

.list-actions button:hover {
  color: var(--snow-white);
} */
</style>
