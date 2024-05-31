<template>
  <div v-if="props.isLoading" class="loading-error-handle-class">
    <SpinnerComp />
  </div>
  <div v-if="props.movies?.length === 0" class="loading-error-handle-class">
    <p>There is no results by your query.</p>
  </div>
  <ul v-for="item in displayed" :key="item.id" class="search-results-container">
    <li>
      <slot name="item" :item="item"></slot>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import SpinnerComp from '../error-handling/SpinnerComp.vue'
import type { IMovie } from '@/interfaces/movie-types'
import getTrendingMovies from '@/api/movies/getTrendingMovies'

interface ISearchResult {
  movies: IMovie[] | null
  isLoading: boolean
  error: string | null
}

const props = defineProps<ISearchResult>()

const preload = ref<IMovie[] | null>(null)

const fetchTrending = async () => {
  preload.value = await getTrendingMovies()
}

onMounted(() => {
  fetchTrending()
})

const displayed = computed(() => {
  return props.movies !== null && props.movies.length > 0
    ? props.movies
    : preload.value
})
</script>

<style scoped>
.loading-error-handle-class {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180px;
}
</style>
