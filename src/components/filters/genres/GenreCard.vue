<template>
  <div class="genre-card">
    <label :for="genre.name">{{ genre.name }}</label>
    <input type="checkbox" :id="genre.name" />
  </div>
</template>

<script setup lang="ts">
import { useFilterStore } from '@/stores/filters'
import type { IGenre } from '@/interfaces/movie-types'
import { ref } from 'vue'

interface IGenreCardProps {
  genre: IGenre
}

const props = defineProps<IGenreCardProps>()
</script>

<style scoped>
.genre-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: capitalize;
  z-index: 100;
}
</style>
