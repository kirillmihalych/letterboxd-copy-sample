<template>
  <button @click="openModalHandler" class="lists-btn">
    <v-icon icon="mdi-playlist-plus" />
    <ModalListHandler
      :isOpen="isModalOpen"
      :movie_id="props.movie_id"
      @close="isModalOpen = false"
    >
      <template #modal-header>
        <h3>Select a list</h3>
      </template>
      <template #modal-content>
        <ListsComponent
          :isModalOpen="isModalOpen"
          :movie_id="$props.movie_id"
        />
      </template>
      <template #modal-actions>
        <RouterLink to="/profile/lists/create"> create new list </RouterLink>
      </template>
    </ModalListHandler>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ListsComponent from '@/components/movie-cards/ListsComponent.vue'
import ModalListHandler from '@/modals/ModalListHandler.vue'

interface IListButton {
  movie_id: number
}

const props = defineProps<IListButton>()

const isModalOpen = ref(false)
const openModalHandler = () => {
  isModalOpen.value = true
}
</script>

<style scoped>
.lists-btn:hover {
  cursor: pointer;
  color: var(--snow-white);
}
</style>
