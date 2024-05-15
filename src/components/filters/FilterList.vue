<template>
  <section class="filter-options">
    <GenreList @update-genres="(genres) => setGenres(genres)" />
    <SortOptionList />
    <VotesAmountInput />
  </section>
</template>

<script setup lang="ts">
import GenreList from './genres/GenreList.vue'
import SortOptionList from '../sort/SortOptionList.vue'
import VotesAmountInput from '../movie-forms/rating/VotesAmountInput.vue'

const emits = defineEmits<{
  (e: 'set-genres', genres: number[]): void
}>()

const setGenres = (genres: number[]) => {
  emits('set-genres', genres)
}
</script>

<style scoped>
.filter-options {
  display: flex;
  align-items: center;
}
</style>
