<template>
  <section class="filter-options">
    <SortFilter />
    <GenreFilter />
    <YearFilter />
    <RatingFilter />
    <VotesFilter />
  </section>
</template>

<script setup lang="ts">
import SortFilter from './SortFilter.vue'
import GenreFilter from './GenreFilter.vue'
import YearFilter from './YearFilter.vue'
import RatingFilter from './RatingFilter.vue'
import VotesFilter from './VotesFilter.vue'
</script>

<style scoped>
.filter-options {
  display: grid;
  place-items: center;
  gap: 0.25rem;
  grid-template-columns: 1fr;
  margin-bottom: 1rem;
}

@media (min-width: 540px) {
  .filter-options {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 768px) {
  .filter-options {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 912px) {
  .filter-options {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
