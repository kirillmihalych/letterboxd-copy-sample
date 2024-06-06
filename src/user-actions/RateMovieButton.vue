<template>
  <button
    title="Rate it"
    class="rate-movie-btn"
    @click="openModal"
    :class="{ rated: isRated }"
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
          @update-is-rated="(is_rated) => setIsRated(is_rated)"
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
}

const props = defineProps<IRateMovieBtn>()

const isRated = ref(false)
const setIsRated = (is_rated: boolean) => (isRated.value = is_rated)
const isLoading = ref(false)
const fetchIsRated = async () => {
  try {
    isLoading.value = true
    isRated.value = (await getAccountState(props.movie_id)).rated.value
      ? true
      : false
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

const isModalOpen = ref(false)
const openModal = () => (isModalOpen.value = true)
const closeModal = () => (isModalOpen.value = false)

onMounted(() => {
  fetchIsRated()
})
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
