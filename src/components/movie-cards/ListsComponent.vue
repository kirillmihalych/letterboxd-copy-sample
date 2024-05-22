<template>
  <div class="lists-component-container">
    <div v-if="isLoading" class="spinner-container"></div>
    <div v-if="error" class="error-container">{{ error }}</div>
    <div v-if="lists" class="lists-container">
      <ListCard
        v-for="list in lists"
        :key="list.id"
        :list="list"
        :movie_id="props.movie_id"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import getLists from '@/api/account/getLists'
import type { IList } from '@/interfaces/lists-types'
import { ref, watchEffect } from 'vue'
import ListCard from './ListCard.vue'
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
.lists-container {
  height: 265px;
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
  overflow-y: scroll;
}
</style>
