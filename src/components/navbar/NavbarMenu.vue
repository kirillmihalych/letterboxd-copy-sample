<template>
  <div class="navbar-menu-wrapper">
    <button class="navbar-menu-btn" @click="dropdownMenuHandler">
      <v-icon v-if="!isMenuOpen" icon="mdi-menu" />
      <v-icon v-else="isMenuOpen" icon="mdi-close" />
    </button>
    <DropdownList :is-dropdown-shown="isMenuOpen" :styles="menuCssProperties">
      <template #dropdown-list>
        <div class="link-list-wrapper">
          <RouterLink
            v-for="route in navbarMenuRoutes"
            :key="route.path"
            :to="route.path"
            class="navbar-menu-link"
            >{{ route.name }}</RouterLink
          >
        </div>
      </template>
    </DropdownList>
  </div>
</template>

<script setup lang="ts">
import { ROUTE_PATHS } from '@/router'
import DropdownList from '../dropdown-list/DropdownList.vue'
import { ref, watchEffect, type CSSProperties } from 'vue'
import { useRoute } from 'vue-router'

const navbarMenuRoutes = [
  {
    name: 'Home',
    path: ROUTE_PATHS.HOME,
  },
  {
    name: 'Movies',
    path: ROUTE_PATHS.MOVIE_LIST,
  },
  {
    name: 'People',
    path: ROUTE_PATHS.PEOPLE,
  },
]

const menuCssProperties: CSSProperties = {
  width: 302 + 'px',
  top: 32 + 'px',
  left: 0,
  overflow: 'hidden',
}

const isMenuOpen = ref(false)

const dropdownMenuHandler = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const route = useRoute()

watchEffect(() => {
  if (route.name) {
    isMenuOpen.value = false
  }
})
</script>

<style scoped>
.navbar-menu-wrapper {
  position: relative;
}

.link-list-wrapper {
  display: grid;
}

.navbar-menu-link {
  padding: 0.25rem 0.5rem;
  color: #222;
}

.navbar-menu-link:hover {
  color: var(--snow-white);
}

.navbar-menu-btn {
  padding: 0.25rem 1.45rem;
  display: flex;
  align-items: center;
  justify-content: start;
  cursor: pointer;
  border-radius: var(--radius);
}

.navbar-menu-btn:hover {
  background-color: rgba(99, 99, 99, 0.5);
}
</style>
