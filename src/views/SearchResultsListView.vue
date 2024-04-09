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
      <SearchResultNavbar
        :categories="result_categories"
        @category-selected="(payload) => setCurrRender(payload)"
      />
      <component :is="dynamic_component" :props="conditional_props" />
    </main>
  </div>
</template>

<script setup lang="ts">
import SpinnerComp from '@/components/error-handling/SpinnerComp.vue'
import SearchResultsMovieList from '@/components/movie-lists/SearchResultsMovieList.vue'
import SearchResultsPersonList from '@/components/movie-lists/SearchResultsPersonList.vue'
import SearchResultsTvList from '@/components/movie-lists/SearchResultsTvList.vue'
import SearchResultNavbar from '@/components/movie-search/SearchResultNavbar.vue'
import type { ISearchResult } from '@/types'
import { computed, ref, watchEffect, type Component } from 'vue'
import { fetchMultiResultsByQuery } from '@/api'
import { useSearchStore } from '@/stores/search'
import _ from 'lodash'

const search = useSearchStore()
const searchResult = ref<ISearchResult[] | null>(null)
const error = ref<string | null>(null)
const loading = ref(false)
const result_categories: Map<string, number> = new Map()

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

interface IComponents {
  movie: Component
  person: Component
  tv: Component
}

const components: IComponents = {
  movie: SearchResultsMovieList,
  person: SearchResultsPersonList,
  tv: SearchResultsTvList,
}

const curr_render = ref<keyof typeof components>('person')
const setCurrRender = (selected: string) => {
  curr_render.value = selected as keyof typeof components
}

const dynamic_component = computed(() => {
  return components[curr_render.value]
})

// =========================================

const filters = {
  movie: (item: ISearchResult) => item.media_type === 'movie',
  person: (item: ISearchResult) => item.media_type === 'person',
  tv: (item: ISearchResult) => item.media_type === 'tv',
}

const conditional_props = computed(() => {
  return searchResult.value?.filter(
    filters[curr_render.value as keyof typeof filters]
  )
})
</script>

<style scoped>
.search-results-container {
  width: 950px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 1rem;
}
</style>
