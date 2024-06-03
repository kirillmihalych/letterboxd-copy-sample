<template>
  <div>
    <FilterList />
    <PaginatedList
      :is-loading="store.isLoading"
      :error="store.error"
      :total_pages="store.pages"
      :movies="store.movies"
    />
  </div>
</template>

<script setup lang="ts">
import { useFilterStore } from '@/stores/filters'
import PaginatedList from '@/components/paginated-list/PaginatedList.vue'
import FilterList from '@/components/filters/FilterList.vue'

const store = useFilterStore()
</script>

<style scoped></style>
