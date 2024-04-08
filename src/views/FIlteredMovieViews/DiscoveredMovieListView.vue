<template>
  <nav class="filter-list-container">
    <h2 class="nav-title">Films</h2>
    <FilterList />
  </nav>
  <hr />
  <section class="movie-list-container">
    <DiscoverMovieList />
  </section>
</template>

<script setup lang="ts">
import FilterList from '@/components/filters/FilterList.vue'
import DiscoverMovieList from '@/components/movie-lists/DiscoverMovieList.vue'
</script>

<style scoped>
.nav-title {
  text-transform: capitalize;
  color: lightgrey;
  font-style: italic;
}

.movie-list-container {
  display: flex;
  justify-content: center;
  align-self: center;
}

.filter-list-container {
  box-sizing: border-box;
  background: grey;
  margin: 0 auto;
  width: 950px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
}
</style>
