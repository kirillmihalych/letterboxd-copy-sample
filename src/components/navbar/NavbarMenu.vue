<template>
  <div class="navbar-menu-container" @mouseleave="isLinkListShowed = false">
    <button
      class="navbar-menu-toggle-btn"
      @mouseenter="isLinkListShowed = true"
    >
      menu
    </button>
    <NavbarLinkList
      v-show="isLinkListShowed"
      @mouseleave="isLinkListShowed = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NavbarLinkList from './NavbarLinkList.vue'

const isLinkListShowed = ref(false)
</script>

<style scoped>
.navbar-menu-container {
  position: relative;
  background: yellow;
}

.navbar-menu-toggle-btn {
  height: 21px;
}
</style>
