<template>
  <div class="img-card">
    <img
      :src="src"
      :alt="title"
      @load="ready = true"
      v-show="ready"
      id="loaded-img"
      :style="imgParams"
    />
    <SpinnerComp v-if="!ready" :cssParams="imgParams" />
  </div>
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
const imgParams = props.imgParams

const ready = ref(false)
const src = ref(props.src)
</script>

<style scoped>
.img-card img {
  box-sizing: border-box;
  /* width: 75px;
  height: 110px; */
  object-fit: fill;
  border: 1px solid transparent;
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
