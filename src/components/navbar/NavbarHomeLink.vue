<template>
  <RouterLink to="/" class="home-link">Back to start</RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.home-link {
  text-decoration: none;
  color: lightgrey;
  font-weight: 800;
  text-transform: uppercase;
}

.home-link:hover {
  cursor: pointer;
  color: #e4e4e4;
}
</style>
