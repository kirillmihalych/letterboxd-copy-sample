<template>
  <button @click="openModal" class="lists-btn">
    <v-icon icon="mdi-playlist-plus" />
    <ModalWindow :isOpen="isModalOpen" @close="closeModal">
      <template #modal-content>
        <ListsComponent :isModalOpen="isModalOpen" :movie_id="props.movie_id" />
      </template>
    </ModalWindow>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ListsComponent from '@/components/movie-cards/ListsComponent.vue'
import ModalWindow from '@/modals/ModalWindow.vue'

interface IListButton {
  movie_id: number
}

const props = defineProps<IListButton>()

const isModalOpen = ref(false)
const openModal = () => (isModalOpen.value = true)
const closeModal = () => (isModalOpen.value = false)
</script>

<style scoped>
.lists-btn:hover {
  cursor: pointer;
  color: var(--snow-white);
}
</style>
