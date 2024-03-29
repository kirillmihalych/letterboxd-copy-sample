<template>
  <form @submit="submitHandler">
    <input type="text" placeholder="ищите фильм" v-model="searchStore.query" />
    <button type="submit">поиск</button>
  </form>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useSearchStore } from '@/stores/search'

const router = useRouter()
const searchStore = useSearchStore()

const submitHandler = (event: Event): void => {
  event.preventDefault()
  if (searchStore.query) {
    searchStore.query.trim()
  }
  router.replace('/films/search_results')
}
</script>

<style scoped></style>
