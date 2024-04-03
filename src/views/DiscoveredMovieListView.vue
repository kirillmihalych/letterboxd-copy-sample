<template>
  <nav>
    <FilterList />
  </nav>
  <section>
    <DiscoverMovieList />
  </section>
</template>

<script setup lang="ts">
import FilterList from '@/components/filters/FilterList.vue'
import DiscoverMovieList from '@/components/movie-discover/DiscoverMovieList.vue'
</script>

<style scoped></style>
