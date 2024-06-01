<template>
  <div class="dropdown-list" v-show="props.isDropdownShown">
    <slot name="loading"></slot>
    <slot name="error"></slot>

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
  /* width: 400px; */
  /* min-height: 200px; */
  max-height: 500px;
  /* min-width: 400px; */
  overflow-y: scroll;
  padding: 1rem;
  border-radius: var(--radius);
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  /* min-height: 200px; */
}

.error-container {
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
}
</style>
