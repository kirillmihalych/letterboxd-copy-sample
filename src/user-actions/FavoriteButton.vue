<template>
  <button
    class="favorite-btn"
    @click="toggleFavoriteHandler()"
    :class="{ favorite: isFavorite }"
  >
    {{ isLoading ? '...' : 'Favorite' }}
  </button>
</template>

<script setup lang="ts">
import getAccountState from '@/api/account/getAccountState'
import toggleFavorite from '@/api/account/toggleFavorite'
import type { IFavoriteMovie } from '@/interfaces/movie-types'
import { ref, watchEffect } from 'vue'
import getAccountID from '@/local-storage/getAccountID'

const account_id = getAccountID()

interface IFavoriteButton {
  movie_id: number
}

const props = defineProps<IFavoriteButton>()
const isLoading = ref(false)
const isFavorite = ref(false)

const getAccountStateHandler = async () => {
  try {
    isLoading.value = true
    isFavorite.value = (await getAccountState(props.movie_id)).favorite
  } catch (err) {
    if (err instanceof Error) {
      console.log('Error in getting an account state' + err.message.toString())
    }
  } finally {
    isLoading.value = false
  }
}

const toggleFavoriteHandler = async () => {
  const favoriteMovie: IFavoriteMovie = {
    media_type: 'movie',
    media_id: props.movie_id,
    favorite: !isFavorite.value,
  }

  try {
    isLoading.value = true
    await toggleFavorite(account_id, favoriteMovie)
    getAccountStateHandler()
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log('Error in toggling favorite' + err.message.toString())
    }
  }
}

watchEffect(() => {
  getAccountStateHandler()
})
</script>

<style scoped>
.favorite-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 78px;
  padding: 1rem;
  border: none;
  background: darkgrey;
  text-transform: capitalize;
}

.favorite-btn:hover {
  cursor: pointer;
  background: lightgrey;
}

.favorite {
  background: #ac94f4;
}

.favorite:hover {
  background: #651fff;
}
</style>
