<template>
  <div class="lists-component-container">
    <div v-if="isLoading" class="spinner-container"></div>
    <div v-if="error" class="error-container">{{ error }}</div>
    <div v-if="lists" class="lists-wrapper">
      <header>
        <h4>Save movie to...</h4>
      </header>
      <ul class="lists-container">
        <ListCard
          v-for="list in lists"
          :key="list.id"
          :list="list"
          :movie_id="props.movie_id"
        />
      </ul>
      <footer>
        <RouterLink :to="createList" class="create-list-link">
          <v-icon icon="mdi-plus" />
          <p>Create new list</p>
        </RouterLink>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import getLists from '@/api/account/getLists'
import type { IList } from '@/interfaces/lists-types'
import { ref, watchEffect } from 'vue'
import ListCard from './ListCard.vue'
import { profileRoutes } from '@/router'
import type { RouteLocationRaw } from 'vue-router'

const createList = profileRoutes.find(
  (route) => route.name === 'Create new list'
) as RouteLocationRaw

interface IListsComponent {
  isModalOpen: boolean
  movie_id: number
}

const props = defineProps<IListsComponent>()

const lists = ref<IList[] | null>(null)
const error = ref<string | null>(null)
const isLoading = ref(false)

const getListsHandler = async () => {
  try {
    isLoading.value = true
    lists.value = (await getLists()).results
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = 'Something went wront. Probably, you are not an authorized.'
    }
  } finally {
    isLoading.value = false
  }
}

watchEffect(() => {
  if (props.isModalOpen) {
    getListsHandler()
  }
})
</script>

<style scoped>
.lists-wrapper {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  gap: 1rem;
  height: 100%;
}

.lists-container {
  height: 10rem;
  display: grid;
  grid-template-rows: 1fr 2fr 1fr;
  overflow-y: scroll;
}

.create-list-link {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.25rem 0.1rem;
  color: #222;
}

.create-list-link:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
