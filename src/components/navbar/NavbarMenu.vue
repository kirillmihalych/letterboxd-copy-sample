<template>
  <div class="menu-container" @mouseleave="isLinkListShowed = false">
    <button class="toggle-btn" @mouseenter="isLinkListShowed = true">
      <v-icon icon="mdi-menu" />
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
}

.toggle-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.25rem;
}
</style>
