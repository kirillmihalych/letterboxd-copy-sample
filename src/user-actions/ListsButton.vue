<template>
  <button class="lists-btn" @click="openModalHandler">
    <v-icon icon="mdi-dots-horizontal" />
  </button>
  <ModalListHandler
    :isOpen="isModalOpen"
    :movie_id="props.movie_id"
    @close="isModalOpen = false"
  >
    <template #modal-header>
      <h3>Select a list</h3>
    </template>
    <template #modal-content>
      <ListsComponent :isModalOpen="isModalOpen" :movie_id="$props.movie_id" />
    </template>
    <template #modal-actions>
      <RouterLink to="/profile/lists/create"> create new list </RouterLink>
    </template>
  </ModalListHandler>
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
.lists-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  color: lightslategray;
  background-color: rgba(0, 0, 0, 50%);
  text-transform: capitalize;
  border-top-right-radius: var(--radius);
  border-bottom-right-radius: var(--radius);
}

.lists-btn:hover {
  cursor: pointer;
  color: var(--snow-white);
}
</style>
