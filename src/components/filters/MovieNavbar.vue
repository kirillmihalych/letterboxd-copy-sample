<template>
  <div class="films-navbar">
    <h3>Browse by</h3>
    <RouterLink to="/films/popular">Popularity</RouterLink>
    <RouterLink to="/films/upcoming">Upcoming</RouterLink>
    <RouterLink to="/films/top_rated">Top rated </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.films-navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
}
</style>
