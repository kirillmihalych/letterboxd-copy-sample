<template>
  <div class="multi-search-results-container">
    <div class="fetch-handle-container" v-if="loading">
      <SpinnerComp />
    </div>
    <div v-if="error">{{ error }}</div>
    <main
      v-if="searchResult && result_categories"
      class="search-results-container"
    >
      <SearchResultNavbar :categories="result_categories" />
    </main>
  </div>
</template>

<script setup lang="ts">
import SpinnerComp from '@/components/error-handling/SpinnerComp.vue'
import SearchResultsMovieList from '@/components/movie-lists/SearchResultsMovieList.vue'
import SearchResultsPersonList from '@/components/movie-lists/SearchResultsPersonList.vue'
import SearchResultsTvList from '@/components/movie-lists/SearchResultsTvList.vue'
import SearchResultList from '@/components/movie-search/SearchResultList.vue'
import SearchResultNavbar from '@/components/movie-search/SearchResultNavbar.vue'
import type { IMovie, ISearchResult } from '@/types'
import { onMounted, ref, watchEffect } from 'vue'
import { fetchMultiResultsByQuery } from '@/api'
import { useSearchStore } from '@/stores/search'
import _, { result } from 'lodash'
import { useRoute } from 'vue-router'

const search = useSearchStore()
const searchResult = ref<ISearchResult[] | null>(null)
const error = ref<string | null>(null)
const loading = ref(false)
const result_categories: Map<string, number> = new Map()
const currentList = ref('movie')
const { fullPath } = useRoute()

const searchByQuery = async () => {
  console.log('call')
  error.value = null
  searchResult.value = null
  try {
    loading.value = true
    searchResult.value = (await fetchMultiResultsByQuery(search.query)).results
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message.toString()
    }
  } finally {
    loading.value = false
    search.isSearchSubmited = false
  }
}

const getCategories = (results: ISearchResult[]) => {
  if (searchResult.value) {
    results.forEach((item: ISearchResult): void => {
      result_categories.set(
        item.media_type,
        // @ts-ignore
        (result_categories.get(item.media_type) + 1) | 1
      )
    })
  }
}

watchEffect(() => {
  if (search.isSearchSubmited) {
    searchByQuery()
  }
})

watchEffect(() => {
  if (searchResult.value) {
    getCategories(searchResult.value)
  }
})

// ==========================
// из листа категорий эмитируется имя
// это имя подставляется в путь роутер линк
// ==========================
// научиться использовать
// динамический vue component
</script>

<style scoped>
.search-results-container {
  width: 950px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 1rem;
}
</style>
