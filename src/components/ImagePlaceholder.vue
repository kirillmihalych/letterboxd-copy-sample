<template>
  <div class="img-wrapper" :style="imgParams">
    <img
      :src="src"
      :alt="title"
      @load="ready = true"
      v-show="ready"
      id="loaded-img"
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
// img params need to center a spinner within container
const imgParams = props.imgParams

const ready = ref(false)
const src = ref(props.src)
</script>

<style scoped>
.img-wrapper {
  grid-row: 1/3;
}
</style>
