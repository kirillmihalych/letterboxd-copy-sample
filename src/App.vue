<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarComponent from './components/navbar/NavbarComponent.vue'
</script>

<template>
  <div class="app-wrapper">
    <header class="app-header">
      <NavbarComponent />
    </header>
    <main class="app-main">
      <div>
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

@layer base {
  :root {
    /* colors */
    --dark-black: #0d0a0b;
    --black: #222;
    --light-black: #3f3f40;
    --dark-grey: #6f7073;
    --light-grey: #a1a2a6;
    --snow-white: #f2f2f2;
    --emerald: #058743;
    --test: #ff5733;
    /* radius */
    --radius: 0.25rem;
    /* fonst */
    --montserrat: 'Montserrat', sans-serif;
    /* font scale */
    --base-size: 1.2rem;
    --scale: 1.25;
    --xl: calc(var(--lg) * var(--scale));
    --lg: calc(var(--h1) * var(--scale));
    --h1: calc(var(--h2) * var(--scale));
    --h2: calc(var(--h3) * var(--scale));
    --h3: calc(var(--h4) * var(--scale));
    --h4: calc(var(--h5) * var(--scale));
    --h5: calc(var(--h6) * var(--scale));
    --h6: var(--base-size);
  }

  html {
    box-sizing: border-box;
    overflow-y: auto;
  }

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    box-sizing: inherit;
    list-style-type: none;
    text-decoration: none;
  }

  body {
    font-family: var(--montserrat);
    line-height: 1.5;
    background-color: var(--snow-white);
    color: var(--dark-black);
  }

  h1,
  h2,
  h3,
  .h1,
  .h2,
  .h3 {
    font-weight: 400;
  }

  h1,
  .h1 {
    font-size: var(--h1);
    line-height: 1;
    margin-bottom: var(--h2);
  }

  h2,
  .h2 {
    font-size: var(--h2);
    line-height: 1.1;
    margin-bottom: var(--h3);
  }

  h3,
  .h3 {
    font-size: var(--h3);
    line-height: 1.2;
    margin-bottom: var(--h4);
  }

  img {
    max-width: 100%;
  }
}
.app-header {
  background-color: var(--snow-white);
  height: 4rem;
  max-width: 950px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 1s ease-in-out;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 0px 8px 0px;
}
.app-main {
  max-width: 950px;
  margin: 0 auto;
  min-height: 100vh;
  padding: 2rem 1rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border: 1px solid var(--light-grey);
  border-top: none;
}
</style>
