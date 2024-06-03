<template>
  <div
    class="dropdown-list"
    v-show="props.isDropdownShown"
    :style="props.styles"
  >
    <slot name="loading"></slot>
    <slot name="error"></slot>

    <slot name="dropdown-list"></slot>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'

interface IDropdown {
  isDropdownShown: boolean
  width?: string
  overflow?: string
  styles?: CSSProperties
}

const props = defineProps<IDropdown>()
</script>

<style scoped>
.dropdown-list {
  position: absolute;
  z-index: 1;
  background: slategrey;
  max-height: 500px;
  overflow-y: scroll;
  padding: 1rem;
  border-radius: var(--radius);
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-container {
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
}
</style>
