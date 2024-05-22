<template>
  <div>
    <div class="navbar-search-container">
      <input
        type="text"
        v-model="query"
        placeholder="Movies, TV series, persons"
        class="navbar-search-input"
        @blur="closeDropdown"
        @focus="openDropdown"
      />
    </div>
    <SearchDropdownList :isDropdownShown="isDropdownShown">
      <template #dropdown-list>
        <SearchResults
          :items="media_array"
          :isLoading="isLoading"
          :error="error"
        >
          <template #item="{ item }">
            <LinkCard :item="item" />
          </template>
        </SearchResults>
      </template>
    </SearchDropdownList>
  </div>
</template>

<script setup lang="ts">
import getSearchResults from '@/api/search/getSearchResults'
import _ from 'lodash'
import { computed, ref, watch } from 'vue'
import type { IMovie, IPerson, ITVShow } from '@/interfaces/movie-types'
import SearchResults from '@/components/user-lists/SearchResults.vue'
import LinkCard from './LinkCard.vue'
import SearchDropdownList from '@/components/user-lists/SearchDropdownList.vue'

const query = ref('')
const isDropdownShown = ref(false)
const openDropdown = () => (isDropdownShown.value = true)
const closeDropdown = () => (isDropdownShown.value = false)
const media_array = ref<(IMovie | ITVShow)[] | null>(null)
const persons = ref<IPerson[] | null>(null)
const error = ref<string | null>(null)
const isLoading = ref(false)

const isPersonsFound = computed(() => {
  return persons.value !== null && persons.value.length > 0
})

const isMediaFound = computed(() => {
  return media_array.value !== null && media_array.value.length > 0
})

const getSearchResultsHandler = async () => {
  if (query.value.length > 0) {
    let value = query.value.trim()
    try {
      isLoading.value = true
      media_array.value = await getSearchResults(value, 1)
      openDropdown()
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message.toString()
      }
      console.log(error)
    } finally {
      if (!isMediaFound.value && !isPersonsFound.value) {
        error.value = 'There is no results by your query'
      }
      isLoading.value = false
    }
  }
}

watch(
  query,
  _.debounce(() => {
    getSearchResultsHandler()
  }, 500)
)
</script>

<style scoped>
.navbar-search-container {
  display: flex;
  z-index: 200;
}

.toggle-search-bar {
  text-decoration: none;
}

.navbar-search-input {
  width: 400px;
  padding: 0.5rem 1rem;
}
</style>
