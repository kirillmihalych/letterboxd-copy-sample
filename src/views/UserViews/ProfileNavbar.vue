<template>
  <div class="profile-navbar-container">
    <RouterLink
      v-for="route in profileRoutes"
      :key="route.path"
      :to="route.path"
      class="profile-navbar-link"
      :class="{ active: route.name === location.name }"
    >
      {{ route.name }}
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { profileRoutes } from '@/router'
import { useRoute } from 'vue-router'

const location = useRoute()
</script>

<style scoped>
.profile-navbar-container {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 1.25rem;
}

.profile-navbar-link {
  width: 85px;
  letter-spacing: 0.05rem;
  text-decoration: none;
  color: #222;
  padding: 1rem;
  font-size: 1.25rem;
  background: darkgrey;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
.profile-navbar-link:hover {
  cursor: pointer;
  background: lightgrey;
}

.active {
  background: lightgrey;
}
</style>
