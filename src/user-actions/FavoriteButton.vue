<template>
  <button
    title="Save to favotires"
    class="favorite-btn"
    @click="toggleFavoriteHandler()"
    :class="{ favorite: props.isFavorite }"
  >
    <v-icon v-if="isLoading" icon="mdi-loading" class="loading" />
    <v-icon icon="mdi-thumb-up" v-if="props.isFavorite && !isLoading" />
    <v-icon
      v-if="!props.isFavorite && !isLoading"
      icon="mdi-thumb-up-outline"
    />
  </button>
</template>

<script setup lang="ts">
import toggleFavorite from '@/api/account/toggleFavorite'
import type { IFavoriteMovie } from '@/interfaces/movie-types'
import { ref } from 'vue'
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

const emits = defineEmits<{
  (e: 'update-is-favorite', isFavorite: boolean): void
}>()

const toggleFavoriteHandler = async () => {
  const favoriteMovie: IFavoriteMovie = {
    media_type: 'movie',
    media_id: props.movie_id,
    favorite: !props.isFavorite,
  }

  try {
    isLoading.value = true
    await toggleFavorite(account_id, favoriteMovie)
    user.fetchFavoriteTitles()
    emits('update-is-favorite', !props.isFavorite)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log('Error in toggling favorite' + err.message.toString())
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.favorite {
  color: orange;
}

.favorite-btn:hover {
  color: var(--snow-white);
  cursor: pointer;
  opacity: 0.85;
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
