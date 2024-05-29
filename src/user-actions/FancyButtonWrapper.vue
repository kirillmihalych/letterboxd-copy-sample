<template>
  <div class="fancy-button-wrapper">
    <slot name="fancy-button-slot"></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.fancy-button-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: slategray;
}

.fancy-button-wrapper button:hover {
  color: var(--snow-white);
}
</style>
