<template>
  <menu class="films-navbar">
    <h4>Browse by</h4>
    <RouterLink
      v-for="route in filterMoviesRoutes"
      :key="route.path"
      :to="route.path"
      class="movie-navbar-link"
      :class="{ active: location.name === route.name }"
    >
      {{ route.name }}
    </RouterLink>
  </menu>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { filterMoviesRoutes } from '@/router'

const location = useRoute()
</script>

<style scoped>
.films-navbar {
  width: 465px;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0.5rem 0rem;
}

h4 {
  margin-right: 0.5rem;
}

.movie-navbar-link {
  color: #222;
  border: 2px solid black;
  background-color: slategray;
  color: var(--snow-white);
  /* border-radius: var(--radius); */
  padding: 0.25rem 0.5rem;
}

.movie-navbar-link:nth-child(2) {
  border-top-left-radius: var(--radius);
  border-bottom-left-radius: var(--radius);
}

.movie-navbar-link:nth-child(3) {
  border-left: none;
  border-right: none;
}

.movie-navbar-link:nth-child(4) {
  border-top-right-radius: var(--radius);
  border-bottom-right-radius: var(--radius);
}

.movie-navbar-link:hover {
  background-color: lightslategray;
}

.active {
  color: orange;
}
</style>
