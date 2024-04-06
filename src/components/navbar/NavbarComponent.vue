<template>
  <div class="navbar-container">
    <nav class="navbar">
      <RouterLink to="/"> back to start</RouterLink>
      <NavbarLinkList />
      <form>
        <input type="text" />
      </form>
    </nav>
  </div>
</template>

<script setup lang="ts">
import NavbarLinkList from './NavbarLinkList.vue'
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.navbar-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.navbar {
  width: 900px;
  padding: 0.25rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #222;
}
</style>
