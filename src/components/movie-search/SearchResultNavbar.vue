<template>
  <div class="search-results-navbar">
    <RouterLink
      :to="base_path + category[0]"
      v-for="category of categories"
      class="category"
    >
      <span>{{ category[0] }}</span>
      <span>{{ category[1] }}</span>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'

type ISearchResultPath =
  | '/films/search_results/movies'
  | '/films/search_results/persons'
  | '/films/search_results/tv_shows'

const paths: ISearchResultPath[] = [
  '/films/search_results/movies',
  '/films/search_results/persons',
  '/films/search_results/tv_shows',
]

const base_path = '/films/search_results/'

interface ISearchCategories {
  categories: Map<string, number>
}

const props = defineProps<ISearchCategories>()
const categories = props.categories

// onMounted(() => {
//   console.log(props.categories)
// })
</script>

<style scoped>
.search-results-navbar {
  /* border: 1px solid black; */
  box-sizing: border-box;
  padding: 0.25rem;
  background: lightgrey;
  border-radius: 0.25rem;
}

.category {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  text-transform: capitalize;
  font-size: 1.2rem;
  padding: 0.2rem;
  border-radius: 0.1rem;
  color: black;
}

.category:hover {
  transition: all 0.1s;
  background: snow;
}
</style>
