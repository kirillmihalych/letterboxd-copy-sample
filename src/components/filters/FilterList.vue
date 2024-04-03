<template>
  <section>
    <h3>Selected : {{ filtersStore.selectedFilters }}</h3>
    <!-- genres -->
    <GenreList />
  </section>
</template>

<script setup lang="ts">
import useFiltersStore from '@/stores/filters'
import { loadGenreList } from '@/api'
import type { IGenre } from '@/types'
import GenreList from './genres/GenreList.vue'
import { computed, onMounted, ref } from 'vue'

const filtersStore = useFiltersStore()
</script>

<style scoped></style>
