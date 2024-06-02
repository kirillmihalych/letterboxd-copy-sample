<template>
  <div>
    <div>
      <input
        type="text"
        v-model="query"
        placeholder="Find a movie for this list"
        class="search-movie-input"
        @focus="openDropdown"
      />
      <button
        v-show="isDropdownShown"
        @click="closeDropdown"
        class="close-dropdown-btn"
      >
        <v-icon icon="mdi-close-box-outline" />
      </button>
    </div>
    <DropdownList :is-dropdown-shown="isDropdownShown">
      <template #dropdown-list>
        <SearchResults :movies="movies" :is-loading="isLoading" :error="error">
          <template #item="{ item: movie }">
            <SearchMovieCard
              :movie="movie"
              @update-list-items="doUpdateListItems"
            />
          </template>
        </SearchResults>
      </template>
    </DropdownList>
  </div>
</template>

<script setup lang="ts">
import type { IMovie } from '@/interfaces/movie-types'
import searchMovies from '@/api/search/searchMovies'
import { ref, watch } from 'vue'
import _ from 'lodash'
import SearchResults from './SearchResults.vue'
import SearchMovieCard from './SearchMovieCard.vue'
import DropdownList from '../dropdown-list/DropdownList.vue'
import MovieSearchCard from '../movie-cards/MovieSearchCard.vue'

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
  outline: none;
  border: 2px solid var(--light-grey);
  padding: 0.5rem;
  border-radius: var(--radius);
  width: 100%;
}

.close-dropdown-btn {
  color: var(--light-grey);
  font-size: 1.5rem;
}

.close-dropdown-btn:hover {
  cursor: pointer;
  color: slategray;
}
</style>
