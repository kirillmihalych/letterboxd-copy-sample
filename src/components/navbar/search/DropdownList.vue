<template>
  <div class="dropdown-list-container">
    <div v-if="props.isLoading" class="loading">
      <SpinnerComp :color="'snow'" />
    </div>
    <div v-if="props.error" class="error">
      {{ props.error }}
    </div>
    <div v-if="!props.isLoading" class="content-container">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IMovie, IPerson, ITVShow } from '@/interfaces/movie-types'
import SpinnerComp from '@/components/error-handling/SpinnerComp.vue'

interface IDropdownList {
  persons: IPerson[] | null
  media: (IMovie | ITVShow)[] | null
  isLoading: boolean
  error: string | null
}

const props = defineProps<IDropdownList>()
</script>

<style scoped>
.dropdown-list-container {
  position: fixed;
  top: 60px;
  z-index: 100;
  background: darkgrey;
  width: 400px;
  display: flex;
  flex-direction: column;
  min-height: 200px;
  padding: 1rem;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
}

.error {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #222;
  height: 200px;
}
</style>
