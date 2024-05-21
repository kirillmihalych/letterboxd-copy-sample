<template>
  <div>
    <div>
      <input
        type="text"
        v-model="query"
        placeholder="Movies, TV series, persons"
        class="search-movie-input"
        @blur="closeDropdown"
        @focus="openDropdown"
      />
    </div>
    <SearchDropdownList :is-dropdown-shown="isDropdownShown">
      <template #dropdown-list>
        <SearchResults :items="movies" :is-loading="isLoading" :error="error">
          <template #item="{ item: movie }">
            <SearchMovieCard :movie="movie" />
          </template>
        </SearchResults>
      </template>
    </SearchDropdownList>
  </div>
</template>

<script setup lang="ts">
import type { IMovie } from '@/interfaces/movie-types'
import searchMovies from '@/api/search/searchMovies'
import { computed, ref, watch, watchEffect } from 'vue'
import _ from 'lodash'
import SearchResults from './SearchResults.vue'
import SearchMovieCard from './SearchMovieCard.vue'
import SearchDropdownList from './SearchDropdownList.vue'

const query = ref('')
const movies = ref<IMovie[] | null>(null)
const error = ref<string | null>(null)
const isLoading = ref(false)
const isDropdownShown = ref(false)
const openDropdown = () => (isDropdownShown.value = true)
const closeDropdown = () => (isDropdownShown.value = false)

const searchMoviesHandler = async () => {
  movies.value = null
  error.value = null

  try {
    isLoading.value = true
    movies.value = await searchMovies(query.value)
    openDropdown()
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message.toString()
    }
  } finally {
    isLoading.value = false
  }
}

watch(
  query,
  _.debounce(() => {
    searchMoviesHandler()
  }, 500)
)
</script>

<style scoped>
.search-movie-input {
  position: relative;
  display: inline-block;
}
</style>
