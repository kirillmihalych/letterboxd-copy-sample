<template>
  <div class="navbar-search-container">
    <form @submit="sumbitSearchHandler">
      <input
        type="text"
        v-model="search.query"
        placeholder="Movies, TV series, persons"
        class="navbar-search-input"
      />
      <button type="submit">do</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useSearchStore } from '@/stores/search'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const search = useSearchStore()

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

.navbar-search-input {
  width: 400px;
}
</style>
