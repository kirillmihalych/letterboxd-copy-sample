<template>
  <section>
    <h3>Selected : {{ filtersStore.selectedOptions }}</h3>
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

// я выбираю жанр, он добавляется к параметрам
// дисковер муви
const filtersStore = useFiltersStore()
</script>

<style scoped></style>
