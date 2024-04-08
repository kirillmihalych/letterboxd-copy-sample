<template>
  <div class="date-form-container">
    <form>
      <input
        type="date"
        v-model="filters.selectedOptions.from_primary_release"
      />
      <input type="date" v-model="filters.selectedOptions.to_primary_release" />
    </form>
  </div>
</template>

<script setup lang="ts">
import useFiltersStore from '@/stores/filters'

const filters = useFiltersStore()
</script>

<style scoped></style>
