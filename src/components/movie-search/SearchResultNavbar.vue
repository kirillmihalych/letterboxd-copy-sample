<template>
  <div class="search-results-navbar">
    <span class="title">Categories</span>
    <span
      v-for="category of categories"
      class="category"
      :style="
        currCategory === category[0]
          ? { background: 'snow' }
          : { background: 'lightgrey' }
      "
      @click="doSelectCategory(category[0])"
    >
      <span>{{ category[0] }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currCategory = ref('movie')

const emits = defineEmits<{
  (e: 'category-selected', payload: string): void
}>()

const doSelectCategory = (selected: string) => {
  emits('category-selected', selected)
  currCategory.value = selected
}

interface ISearchCategories {
  categories: Map<string, number>
}

const props = defineProps<ISearchCategories>()
const categories = props.categories
</script>

<style scoped>
.active {
  background: grey;
}

.search-results-navbar {
  height: 150px;
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
  cursor: pointer;
  transition: all 0.1s;
  background: snow;
}

.title {
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
  font-weight: 800;
}
</style>
