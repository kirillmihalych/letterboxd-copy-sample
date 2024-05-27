<template>
  <slot name="header"></slot>
  <ul class="carousel" id="slider">
    <li v-for="item in props.items" :key="item.id">
      <slot name="item" :item="item"></slot>
    </li>
  </ul>
</template>

<script setup lang="ts">
interface ICarousel {
  items: any[]
}

const props = defineProps<ICarousel>()
</script>

<style scoped>
.carousel {
  height: 21.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem;
  gap: 0.25rem;
  transition: all 1s linear;
  overflow-x: auto;
  overscroll-behavior-inline: contain;
  scroll-behavior: smooth;
}

.carousel::-webkit-scrollbar {
  width: 0.5rem;
}
.carousel::-webkit-scrollbar-track {
  background-color: var(--light-grey);
}
.carousel::-webkit-scrollbar-thumb {
  width: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 1);
}

/* firefox */
html {
  scrollbar-color: var(--light-grey) var(--light-black);
  scrollbar-width: thin;
}
</style>
