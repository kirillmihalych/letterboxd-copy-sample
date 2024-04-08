<template>
  <div class="genre-card">
    <label :for="genre.name">{{ genre.name }}</label>
    <input
      type="checkbox"
      :id="genre.name"
      :value="genre.id"
      v-model="filterStore.selectedOptions.genres"
    />
  </div>
</template>

<script setup lang="ts">
import type { IGenre } from '@/types'
import useFiltersStore from '@/stores/filters'

const filterStore = useFiltersStore()

interface IGenreCardProps {
  genre: IGenre
}

const props = defineProps<IGenreCardProps>()
const genre = props.genre
</script>

<style scoped>
.genre-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: capitalize;
}
</style>
