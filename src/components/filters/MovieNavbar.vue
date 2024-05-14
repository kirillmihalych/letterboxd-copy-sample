<template>
  <div class="films-navbar">
    <h3>Browse movies by</h3>
    <RouterLink
      v-for="route in filterMoviesRoutes"
      :key="route.path"
      :to="route.path"
    >
      {{ route.name }}
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { filterMoviesRoutes } from '@/router'
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
