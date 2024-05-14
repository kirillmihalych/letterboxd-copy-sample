<template>
  <slot name="header"></slot>
  <div class="carousel" id="slider">
    <div v-for="item in props.items" :key="item.id">
      <slot name="item" :item="item"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ICarousel {
  items: any[]
}

const props = defineProps<ICarousel>()
</script>

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
