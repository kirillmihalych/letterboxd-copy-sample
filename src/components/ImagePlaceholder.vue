<template>
  <figure class="img-card" :style="imgParams">
    <img
      :src="src"
      :alt="title"
      @load="ready = true"
      v-show="ready"
      id="loaded-img"
      :style="imgParams"
    />
    <SpinnerComp v-if="!ready" :cssParams="imgParams" />
  </figure>
</template>

<script setup lang="ts">
import { ref, type CSSProperties } from 'vue'
import SpinnerComp from './error-handling/SpinnerComp.vue'

interface IImagePlaceholderProps {
  src: string
  title: string
  imgParams: CSSProperties
}

const props = defineProps<IImagePlaceholderProps>()
const { title } = props
// img params need to center a spinner within container
const imgParams = props.imgParams

const ready = ref(false)
const src = ref(props.src)
</script>

<style scoped>
.img-card img {
  object-fit: fill;
  transition: border 0.1s linear;
}

.img-card-menu {
  position: absolute;
  bottom: 0;
}
</style>
