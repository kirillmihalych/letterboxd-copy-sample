<template>
  <div class="dropdown-list" v-show="props.isDropdownShown">
    <slot name="dropdown-list"></slot>
  </div>
</template>

<script setup lang="ts">
interface IDropdown {
  isDropdownShown: boolean
}

const props = defineProps<IDropdown>()
</script>

<style scoped>
.dropdown-list {
  position: absolute;
  z-index: 1;
  background: slategrey;
  width: 400px;
  min-height: 200px;
  max-height: 500px;
  overflow-y: scroll;
  padding: 1rem;
}
</style>
