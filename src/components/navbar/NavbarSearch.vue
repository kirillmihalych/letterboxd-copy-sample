<template>
  <div class="navbar-search-container">
    <button
      class="toggle-search-bar"
      @click="openSearchBarHandler"
      v-show="!isSearchBarShowed"
    >
      open search
    </button>
    <button
      class="toggle-search-bar"
      @click="closeSearchBarHandler"
      v-show="isSearchBarShowed"
    >
      close search
    </button>
    <form v-show="isSearchBarShowed" @submit="sumbitSearchHandler">
      <input type="text" v-model="search.query" />
      <button type="submit">do search</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useSearchStore } from '@/stores/search'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const search = useSearchStore()

const emit = defineEmits<{
  (e: 'toggle-search'): void
}>()

const doToggleSearch = () => {
  emit('toggle-search')
}

const isSearchBarShowed = ref(false)

const openSearchBarHandler = () => {
  isSearchBarShowed.value = true
  doToggleSearch()
}

const closeSearchBarHandler = () => {
  isSearchBarShowed.value = false
  doToggleSearch()
}

const sumbitSearchHandler = (e: Event) => {
  e.preventDefault()
  search.isSearchSubmited = true
  router.replace('/films/search_results')
}

//
</script>

<style scoped>
.navbar-search-container {
  display: flex;
}

.toggle-search-bar {
  text-decoration: none;
}
</style>
