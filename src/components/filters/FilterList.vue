<template>
  <section class="filter-options">
    <GenreList />
    <SortOptionList />
    <VotesAmountInput />
  </section>
</template>

<script setup lang="ts">
import GenreList from './genres/GenreList.vue'
import SortOptionList from '../sort/SortOptionList.vue'
import VotesAmountInput from './rating/VotesAmountInput.vue'
</script>

<style scoped>
.filter-options {
  display: flex;
  align-items: center;
}
</style>
