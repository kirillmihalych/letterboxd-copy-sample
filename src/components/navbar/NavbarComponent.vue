<template>
  <div class="navbar-container">
    <RouterLink to="/base-layout">
      <v-icon icon="mdi-fire" class="fire-icon" />
    </RouterLink>
    <nav class="navbar">
      <!-- <div class="left-part-navbar-container">
        <NavbarMenu />
      </div> -->
      <NavbarMultiSearch />
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
  border-bottom: 1px solid var(--light-grey);
  background-color: var(--snow-white);
  height: 4rem;
  min-width: 400px;
  max-width: 948px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 1s ease-in-out;
}

.navbar {
  width: 950px;
  height: 4rem;
  padding: 0.25rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-part-navbar-container {
  width: 200px;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 0.5rem;
}

.fire-icon {
  color: var(--snow-white);
  width: 45px;
  font-size: 2.25rem;
  margin-left: 0.5rem;
  color: red;
}

.fire-icon:hover {
  color: orangered;
}

/* @media (max-width: 963px) {
  .navbar-container {
    border-left: 1px solid var(--light-grey);
    border-right: 1px solid var(--light-grey);
  }

  .fire-icon {
    display: none;
  }
} */
</style>
