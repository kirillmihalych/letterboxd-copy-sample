<template>
  <div class="component-container">
    <div v-if="!isUserAuthorized" class="user-not-authorized">
      You are not an authorized.
    </div>
    <div v-if="isUserAuthorized" class="user-actions-container">
      <div class="rating-container">
        <RatingHandler :movie_id="props.movie_id" :release="props.release" />
      </div>
      <div class="list-actions">
        <FavoriteButton :movie_id="props.movie_id" />
        <WatchlistButton :movie_id="props.movie_id" />
        <ListsButton :movie_id="props.movie_id" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FavoriteButton from './FavoriteButton.vue'
import WatchlistButton from './WatchlistButton.vue'
import ListsButton from './ListsButton.vue'
import { getSessionFromLocalStorage } from '@/local-storage/getSession'
import RatingHandler from './RatingHandler.vue'

interface IUserActionsMenu {
  movie_id: number
  release: string
}

const props = defineProps<IUserActionsMenu>()

const isUserAuthorized = getSessionFromLocalStorage() ? true : false
</script>

<style scoped>
.user-actions-container {
  background-color: var(--light-grey);
}

.rating-container {
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.list-actions {
  background: darkgrey;
  color: #222;
  height: 45px;
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
  text-transform: capitalize;
  border-top: 2px solid #222;
}
</style>
