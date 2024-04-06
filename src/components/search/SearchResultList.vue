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
import { onMounted, ref, watchEffect } from 'vue'
import { fetchMultiResultsByQuery } from '@/api'
import { useSearchStore } from '@/stores/search'
import _ from 'lodash'

const search = useSearchStore()
const searchResult = ref<IMovie[] | null>(null)
const error = ref<string | null>(null)
const loading = ref(false)

const searchByQuery = async () => {
  console.log('call')
  error.value = null
  searchResult.value = null
  try {
    loading.value = true
    searchResult.value = await fetchMultiResultsByQuery(search.query)
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message.toString()
    }
  } finally {
    loading.value = false
    search.isSearchSubmited = false
  }
}

watchEffect(() => {
  if (search.isSearchSubmited) {
    searchByQuery()
  }
})
</script>

<style scoped></style>
