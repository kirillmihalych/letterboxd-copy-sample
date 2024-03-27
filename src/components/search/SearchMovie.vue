<template>
  <form @submit="submitHandler">
    <input type="text" placeholder="ищите фильм" v-model="query" />
    <button type="submit">search</button>
  </form>
  <section>
    <SearchResultsList :movies="searchResult" />
  </section>
</template>

<script setup lang="ts">
import SearchResultsList from './SearchResultsList.vue'
import { fetchByTitle } from '@/api'
import type { IMovie } from '@/types'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const query = ref<string>('')
const searchResult = ref<IMovie[] | null>(null)
const error = ref<string | null>(null)
const loading = ref(false)
const router = useRouter()

const searchMovieByTitle = async (title: string) => {
  error.value = null
  searchResult.value = null
  try {
    loading.value = true
    searchResult.value = await fetchByTitle(title)
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message.toString()
    }
  } finally {
    loading.value = false
  }
}

const submitHandler = (event: Event): void => {
  event.preventDefault()
  if (query) {
    const queryValue = query.value.trim()
    searchMovieByTitle(queryValue)
  }
  router.push('/films/search_results')
  query.value = ''
}

// создать поиск результ компонент
//
// если у меня есть результаты поиска
// я показываю результаты поиска
//
// если у меня их нет, то карусель
</script>

<style scoped></style>
