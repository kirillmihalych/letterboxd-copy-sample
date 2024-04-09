<template>
  <div class="navbar-container">
    <nav class="navbar">
      <div class="left-part-navbar-container">
        <NavbarMenu />
        <NavbarHomeLink />
      </div>
      <!-- <NavbarLinkList v-show="isLinksShowed" /> -->
      <NavbarSearch />
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NavbarLinkList from './NavbarLinkList.vue'
import NavbarHomeLink from './NavbarHomeLink.vue'
import NavbarSearch from './NavbarSearch.vue'
import NavbarMenu from './NavbarMenu.vue'

const isLinksShowed = ref(true)
</script>

<style scoped>
.navbar-container {
  margin: 0 auto;
  width: 950px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 1s ease-in-out;
  margin-bottom: 1rem;
}

.navbar {
  width: 950px;
  height: 60px;
  padding: 0.25rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #222;
}

.left-part-navbar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}
</style>
