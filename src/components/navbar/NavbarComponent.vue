<template>
  <div class="navbar-container">
    <div class="navbar-left-part">
      <NavbarMenu />
      <NavbarMultiSearch />
    </div>
    <nav class="navbar">
      <NavbarUsersProfile />
    </nav>
  </div>
</template>

<script setup lang="ts">
import NavbarMultiSearch from './search/NavbarMultiSearch.vue'
import NavbarMenu from './NavbarMenu.vue'
import NavbarUsersProfile from './NavbarUsersProfile.vue'
</script>

<style scoped>
.navbar-container {
  position: fixed;
  background-color: var(--snow-white);
  border: 1px solid var(--light-grey);
  border-top: none;
  border-bottom: 1px solid var(--light-grey);
  width: 100%;
  height: 4rem;
  max-width: 950px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  transition: transform 1s ease-in-out;
  z-index: 2;
}

.navbar {
  max-width: 950px;
  height: 100%;
  padding: 0.25rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.fire-icon {
  color: var(--snow-white);
  font-size: 2.25rem;
  margin-left: 0.5rem;
  color: red;
}

.fire-icon:hover {
  color: orangered;
}

.navbar-left-part {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  width: 302px;
}

@media (max-width: 767px) {
  .home-link {
    display: none;
  }
}
</style>
