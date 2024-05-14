<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarComponent from './components/navbar/NavbarComponent.vue'
</script>

<template>
  <main class="main-view">
    <NavbarComponent />
    <div class="main-view-container">
      <RouterView />
    </div>
  </main>
</template>

<style>
/* * {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  box-sizing: border-box;
} */

.main-view {
  width: 950px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
