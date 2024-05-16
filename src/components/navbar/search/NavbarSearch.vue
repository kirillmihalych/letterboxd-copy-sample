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
    <DropdownList
      v-show="query.length"
      :persons="persons"
      :media="media"
      :isLoading="isLoading"
      :error="error"
    />
  </div>
</template>

<script setup lang="ts">
import getSearchResults from '@/api/search/getSearchResults'
import _ from 'lodash'
import { ref, watch } from 'vue'
import DropdownList from './DropdownList.vue'
import type { IMovie, IPerson, ITVShow } from '@/interfaces/movie-types'
// [__] для муви и сериалов создать дженерик страницу или перенаправлять на разные страницы в зависимости от типы-медиа
// [__] сделать navbar fixed

const query = ref('')
const media = ref<(IMovie | ITVShow)[] | null>(null)
const persons = ref<IPerson[] | null>(null)
const error = ref<string | null>(null)
const isLoading = ref(false)

const getSearchResultsHandler = async () => {
  if (query.value.length > 0) {
    try {
      isLoading.value = true
      media.value = (await getSearchResults(query.value, 1)).media
      persons.value = (await getSearchResults(query.value, 1)).persons
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message.toString()
      }
      console.log(error)
    } finally {
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
