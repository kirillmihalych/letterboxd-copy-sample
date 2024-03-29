<template>
  <section v-if="loading">Loading...</section>
  <section v-if="error">{{ error }}</section>
  <section v-if="searchResult">
    <SearchResultCard
      v-for="movie in searchResult"
      :key="movie.id"
      :movie="movie"
    />
  </section>
  <section v-if="(searchResult?.length as number) < 1">
    Запрос пуст или по запросу ничего не найдено.
  </section>
</template>

<script setup lang="ts">
import type { IMovie } from '@/types'
import SearchResultCard from './SearchResultCard.vue'
import { ref, watchEffect } from 'vue'
import { fetchByTitle } from '@/api'
import { useSearchStore } from '@/stores/search'
import _ from 'lodash'

const searchStore = useSearchStore()
const searchResult = ref<IMovie[] | null>(null)
const error = ref<string | null>(null)
const loading = ref(false)

const searchMoviesByTitle = async (title: string) => {
  console.log('call')
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

const doUpdateSearch = _.debounce((query) => {
  searchMoviesByTitle(query)
}, 1000)

watchEffect(() => {
  doUpdateSearch(searchStore.query)
})
</script>

<style scoped></style>
