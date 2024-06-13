<template>
  <button
    title="Rate it"
    class="rate-movie-btn"
    @click="openModal"
    :class="{ rated: props.isRated }"
  >
    <v-icon v-if="isLoading" icon="mdi-loading" class="loading" />
    <v-icon v-else="!isLoading" icon="mdi-star" />
    <ModalWindow :isOpen="isModalOpen" @close="closeModal">
      <template #modal-content>
        <RatingHandler
          :movie_id="props.movie_id"
          :release="props.release"
          :vote_average="props.vote_average"
          :vote_count="props.vote_count"
          :rating="props.rating"
          @update-is-rated="(isRated) => setIsRated(isRated)"
        />
      </template>
    </ModalWindow>
  </button>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import ModalWindow from '@/modals/ModalWindow.vue'
import RatingHandler from './RatingHandler.vue'
import getAccountState from '@/api/account/getAccountState'

interface IRateMovieBtn {
  movie_id: number
  release: string
  vote_average: number
  vote_count: number
  isRated: boolean
  rating: number
}

const props = defineProps<IRateMovieBtn>()
const emits = defineEmits<{
  (e: 'update-is-rated', isRated: boolean): void
}>()

const isLoading = ref(false)
const setIsRated = (isRated: boolean) => {
  emits('update-is-rated', isRated)
}

const isModalOpen = ref(false)
const openModal = () => (isModalOpen.value = true)
const closeModal = () => (isModalOpen.value = false)
</script>

<style scoped>
.rate-movie-btn:hover {
  cursor: pointer;
  color: var(--snow-white);
}

.rated {
  color: orange;
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
