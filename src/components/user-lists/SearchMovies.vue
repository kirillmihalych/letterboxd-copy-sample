<template>
  <div>
    <div>
      <button @click="closeDropdown">close</button>
      <input
        type="text"
        v-model="query"
        placeholder="Movies, TV series, persons"
        class="search-movie-input"
        @focus="openDropdown"
      />
    </div>
    <SearchDropdownList :is-dropdown-shown="isDropdownShown">
      <template #dropdown-list>
        <SearchResults :items="movies" :is-loading="isLoading" :error="error">
          <template #item="{ item: movie }">
            <SearchMovieCard
              :movie="movie"
              @update-list-items="doUpdateListItems"
            />
          </template>
        </SearchResults>
      </template>
    </SearchDropdownList>
  </div>
</template>

<script setup lang="ts">
import type { IMovie } from '@/interfaces/movie-types'
import searchMovies from '@/api/search/searchMovies'
import { ref, watch } from 'vue'
import _ from 'lodash'
import SearchResults from './SearchResults.vue'
import SearchMovieCard from './SearchMovieCard.vue'
import SearchDropdownList from './SearchDropdownList.vue'

const emits = defineEmits<{
  (e: 'update-list-items'): void
}>()
const doUpdateListItems = () => emits('update-list-items')

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
  let value = query.value.trim()
  try {
    isLoading.value = true
    movies.value = await searchMovies(value)
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
