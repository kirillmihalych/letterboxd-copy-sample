<template>
  <div class="image">
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
img {
  width: 175px;
  object-fit: fill;
}
</style>
