<template>
  <div class="genre-card">
    <label :for="genre.name">{{ genre.name }}</label>
    <input
      type="checkbox"
      :id="genre.name"
      :value="genre.id"
      @change="(e) => setSelectedGenre(e, genre.id)"
    />
  </div>
</template>

<script setup lang="ts">
import type { IGenre } from '@/interfaces/movie-types'
import { ref } from 'vue'

interface IGenreCardProps {
  genre: IGenre
}

const props = defineProps<IGenreCardProps>()
const genre = props.genre
const emits = defineEmits<{
  (e: 'add-genre', genre_id: number): void
  (e: 'remove-genre', genre_id: number): void
}>()
const selectedGenre = ref(1)
const setSelectedGenre = (e: Event, genre_id: number) => {
  const checked = (e.target as HTMLInputElement).checked
  selectedGenre.value = genre_id
  if (checked) {
    emits('add-genre', selectedGenre.value)
  } else {
    emits('remove-genre', selectedGenre.value)
  }
}
</script>

<style scoped>
.genre-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: capitalize;
}
</style>
