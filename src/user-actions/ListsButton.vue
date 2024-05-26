<template>
  <button class="lists-btn" @click="openModalHandler">lists</button>
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
  /* width: 78px;
  padding: 1rem; */
  border: none;
  background: darkgrey;
  text-transform: capitalize;
}

.lists-btn:hover {
  cursor: pointer;
  background: lightgrey;
}
</style>
