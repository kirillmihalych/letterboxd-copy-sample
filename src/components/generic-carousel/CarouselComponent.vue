<template>
  <div class="carousel" id="slider">
    <slot name="films"></slot>
    <slot name="people"></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.carousel {
  box-sizing: border-box;
  width: 950px;
  height: 500px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 1s linear;
  overflow-x: scroll;
  scroll-behavior: smooth;
}
</style>
