<template>
  <button
    title="Save to favotires"
    class="favorite-btn"
    @click="toggleFavoriteHandler()"
    :class="{ favorite: isFavorite }"
  >
    <v-icon v-if="isLoading" icon="mdi-loading" class="loading" />
    <v-icon icon="mdi-thumb-up" v-if="!isLoading" />
  </button>
</template>

<script setup lang="ts">
import getAccountState from '@/api/account/getAccountState'
import toggleFavorite from '@/api/account/toggleFavorite'
import type { IFavoriteMovie } from '@/interfaces/movie-types'
import { ref, watchEffect } from 'vue'
import getAccountID from '@/local-storage/getAccountID'
import { useUserStore } from '@/stores/user'

const user = useUserStore()
const account_id = getAccountID()

interface IFavoriteButton {
  movie_id: number
  isFavorite: boolean
}

const props = defineProps<IFavoriteButton>()
const isLoading = ref(false)
const isFavorite = ref(props.isFavorite)

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
    user.fetchTitles()
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log('Error in toggling favorite' + err.message.toString())
    }
  }
}

// watchEffect(() => {
//   getAccountStateHandler()
// })
</script>

<style scoped>
.favorite {
  color: red;
}

.favorite-btn:hover {
  cursor: pointer;
  color: var(--snow-white);
}

.favorite:hover {
  color: pink;
}

.loading {
  animation: spin 0.75s linear infinite;
  color: var(--snow-white);
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
