<template>
  <menu class="films-navbar">
    <div class="dropdown-menu-wrapper">
      <span class="menu-opener" @click="toggleMenu"
        >Browse by <v-icon icon="mdi-menu-down"
      /></span>
      <DropdownList :is-dropdown-shown="isMenuOpen">
        <template #dropdown-list>
          <div class="menu-links-wrapper">
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
      </DropdownList>
    </div>
  </menu>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { filterMoviesRoutes } from '@/router'
import DropdownList from '../dropdown-list/DropdownList.vue'
import { ref } from 'vue'

const location = useRoute()

const isMenuOpen = ref(false)
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value)
</script>

<style scoped>
.menu-opener {
  padding: 0.5rem 0rem;
}

.films-navbar {
  display: flex;
  justify-content: start;
  align-items: center;
}

h4 {
  margin-right: 0.5rem;
  position: relative;
}

.movie-navbar-link {
  color: #222;
  background-color: slategray;
  color: var(--snow-white);
  padding: 0.25rem 0.5rem;
}

.movie-navbar-link:hover {
  background-color: lightslategray;
}

.active {
  color: orange;
}

.menu-links-wrapper {
  display: grid;
}
</style>
