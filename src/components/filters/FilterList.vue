<template>
  <section class="filter-options">
    <GenreList @update-genres="(genres) => setGenres(genres)" />
    <VotesAmountInput @set-votes-amount="(votes) => setVotesAmount(votes)" />
  </section>
</template>

<script setup lang="ts">
import GenreList from './genres/GenreList.vue'
import VotesAmountInput from './rating/VotesAmountInput.vue'

const emits = defineEmits<{
  (e: 'set-genres', genres: number[]): void
  (e: 'set-votes-amount', votes_amount: string): void
}>()

const setGenres = (genres: number[]) => {
  emits('set-genres', genres)
}

const setVotesAmount = (votes: string) => {
  emits('set-votes-amount', votes)
}
</script>

<style scoped>
.filter-options {
  display: flex;
  align-items: center;
}
</style>
