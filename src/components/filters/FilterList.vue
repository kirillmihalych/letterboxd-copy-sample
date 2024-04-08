<template>
  <section class="filter-options">
    <GenreList />
    <SortOptionList />
    <VotesAmountInput />
  </section>
</template>

<script setup lang="ts">
import GenreList from '../movie-forms/genres/GenreList.vue'
import SortOptionList from '../sort/SortOptionList.vue'
import VotesAmountInput from '../movie-forms/rating/VotesAmountInput.vue'
</script>

<style scoped>
.filter-options {
  display: flex;
  align-items: center;
}
</style>
