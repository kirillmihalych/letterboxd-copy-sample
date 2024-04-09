<template>
  <div class="search-results-navbar">
    <span
      v-for="category of categories"
      class="category"
      @click="doSelectCategory(category[0])"
    >
      <span>{{ category[0] }}</span>
      <span>{{ category[1] }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  (e: 'category-selected', payload: string): void
}>()

const doSelectCategory = (selected: string) => {
  emits('category-selected', selected)
}

interface ISearchCategories {
  categories: Map<string, number>
}

const props = defineProps<ISearchCategories>()
const categories = props.categories
</script>

<style scoped>
.search-results-navbar {
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
</style>
