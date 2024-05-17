<template>
  <div>
    <div class="navbar-search-container">
      <input
        type="text"
        v-model="query"
        placeholder="Movies, TV series, persons"
        class="navbar-search-input"
      />
    </div>
    <slot
      :persons="persons"
      :media_array="media_array"
      :isLoading="isLoading"
      :error="error"
      :isMediaFound="isMediaFound"
      :isPersonsFound="isPersonsFound"
      :isQueryEntered="isQueryEntered"
    ></slot>
  </div>
</template>

<script setup lang="ts">
import getSearchResults from '@/api/search/getSearchResults'
import _ from 'lodash'
import { computed, ref, watch } from 'vue'
import type { IMovie, IPerson, ITVShow } from '@/interfaces/movie-types'

const query = ref('')
const isQueryEntered = computed(() => {
  return query.value.length > 0
})
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
    try {
      isLoading.value = true
      media_array.value = (await getSearchResults(query.value, 1)).media.slice(
        0,
        3
      )
      persons.value = (await getSearchResults(query.value, 1)).persons.slice(
        0,
        3
      )
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
}

.toggle-search-bar {
  text-decoration: none;
}

.navbar-search-input {
  width: 400px;
  padding: 0.5rem 1rem;
}
</style>
