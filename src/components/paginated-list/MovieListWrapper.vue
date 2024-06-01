<template>
  <div class="movies-container">
    <slot name="movie-cards"></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.movies-container {
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
  gap: 0.25rem;
}

@media (min-width: 540px) {
  .movies-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) {
  .movies-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 912px) {
  .movies-container {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
