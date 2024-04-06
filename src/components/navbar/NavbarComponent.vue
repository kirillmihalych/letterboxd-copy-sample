<template>
  <div class="navbar-container">
    <nav class="navbar">
      <NavbarHomeLink />
      <NavbarLinkList v-show="isLinksShowed" />
      <NavbarSearch @toggle-search="doToggleLinks" />
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NavbarLinkList from './NavbarLinkList.vue'
import NavbarHomeLink from './NavbarHomeLink.vue'
import NavbarSearch from './NavbarSearch.vue'

const isLinksShowed = ref(true)

const doToggleLinks = () => {
  isLinksShowed.value = !isLinksShowed.value
}
</script>

<style scoped>
.navbar-container {
  margin: 0 auto;
  width: 950px;

  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 1s ease-in-out;
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
</style>
