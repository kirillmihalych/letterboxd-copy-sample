<template>
  <div class="img-wrapper" :style="imgParams">
    <img
      :src="src"
      :alt="title"
      @load="ready = true"
      v-show="ready"
      id="loaded-img"
    />
    <IconSpinner
      v-if="!ready && !src.includes('null')"
      :cssParams="imgParams"
    />
    <v-icon icon="mdi-image-outline" v-if="src.includes('null')" />
  </div>
</template>

<script setup lang="ts">
import { ref, type CSSProperties } from 'vue'
import IconSpinner from './error-handling/IconSpinner.vue'

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
.img-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-row: 1/3;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
