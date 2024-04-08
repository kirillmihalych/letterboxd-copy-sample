<template>
  <div class="films-navbar">
    <h3>Browse by</h3>
    <RouterLink to="/films/popular">Popularity</RouterLink>
    <RouterLink to="/films/upcoming">Upcoming</RouterLink>
    <RouterLink to="/films/top_rated">Top rated </RouterLink>
    <RouterLink to="/films/discovered_list">Free discover</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.films-navbar {
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
}

.films-navbar a {
  text-decoration: none;
  color: snow;
  background: #222;
  padding: 0.1rem 0.2rem;
  border-radius: 0.25rem;
}

.films-navbar a:hover {
  background: darkgrey;
  transition: all 0.1s;
}
</style>
