<template>
  <ul class="navbar-links-container">
    <RouterLink v-for="key of navbarRoutes" :key="key.path" :to="key.path">{{
      key.name
    }}</RouterLink>
  </ul>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { navbarRoutes } from '@/router'
</script>

<style scoped>
.navbar-links-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  text-transform: uppercase;
  background: #222;
}

.navbar-links-container a {
  text-decoration: none;
  color: lightgrey;
  font-weight: 800;
}

.navbar-links-container a:hover {
  cursor: pointer;
  color: #e4e4e4;
}
</style>
