<template>
  <div class="films-navbar">
    <h3>Browse by</h3>

    <RouterLink
      v-for="route in filterMoviesRoutes"
      :key="route.path"
      :to="route.path"
      class="movie-navbar-link"
      :class="{ active: location.name === route.name }"
    >
      {{ route.name }}
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { filterMoviesRoutes } from '@/router'

const location = useRoute()
</script>

<style scoped>
.films-navbar {
  box-sizing: border-box;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 1rem;
}

.movie-navbar-link {
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 50px;
  font-weight: bold;
  background: darkgray;
  color: #222;
  box-sizing: border-box;
}

.movie-navbar-link:hover {
  background: lightgray;
}

.active {
  border: #651fff 2px solid;
  background: lightgrey;
}
</style>
