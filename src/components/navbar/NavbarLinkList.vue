<template>
  <div class="navbar-links-container" @mouseleave="$emit('close-links')">
    <RouterLink v-for="key of navbarRoutes" :key="key.path" :to="key.path">{{
      key.name
    }}</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { navbarRoutes } from '@/router'
</script>

<style scoped>
.navbar-links-container {
  width: 185px;
  background: darkgrey;

  position: absolute;
  top: 21px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  gap: 0.25rem;
  text-transform: uppercase;
}

.navbar-links-container a {
  padding-top: 0.15rem;
  text-decoration: none;
  color: #222;
  font-weight: 800;
}

.navbar-links-container a:hover {
  cursor: pointer;
  color: #e4e4e4;
}
</style>
