<template>
  <form @submit="submitHandler">
    <input type="text" placeholder="ищите фильм" v-model="searchStore.query" />
    <button type="submit">поиск</button>
  </form>
</template>

<script setup lang="ts">
import { fetchByTitle } from '@/api'
import type { IMovie } from '@/types'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSearchStore } from '@/stores/search'

const router = useRouter()
const searchStore = useSearchStore()

const submitHandler = (event: Event): void => {
  event.preventDefault()
  if (searchStore.query) {
    searchStore.query.trim()
    // searchMoviesByTitle(queryValue)
  }
  router.replace('/films/search_results')
  // query.value = ''
}

// вбиваю query в SearchMovie который должен быть виден везде в приложении
// передаю по сабмиту этот квери в SearchResultsList, который в себе делает fetch
// и там обрабатывается лоадинг, еррор и отображается дата
</script>

<style scoped></style>
