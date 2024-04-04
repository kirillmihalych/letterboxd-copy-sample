<template>
  <div class="img-card">
    <img :src="src" :alt="title" @load="ready = true" v-show="ready" />
    <slot v-if="!ready" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface IImagePlaceholderProps {
  src: string
  title: string
}

const props = defineProps<IImagePlaceholderProps>()
const { title } = props

const ready = ref(false)
const src = ref(props.src)
</script>

<style scoped>
.img-card img {
  box-sizing: border-box;
  width: 75px;
  height: 110px;
  object-fit: fill;
  border: 2.5px solid transparent;
  border-radius: 0.25rem;
  transition: border 0.1s linear;
}

.img-card img:hover {
  border: 1px solid #222;
}

.img-card-menu {
  position: absolute;
  bottom: 0;
}
</style>
