<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarComponent from './components/navbar/NavbarComponent.vue'
</script>

<template>
  <div class="app-wrapper">
    <main class="main-view">
      <NavbarComponent />
      <div class="main-view-container">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  box-sizing: border-box;
}

html {
  overflow-y: scroll;
}

.main-view {
  width: 950px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.app-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 800px;
  margin: 0 auto;
}
</style>
