<template>
  <section class="filter-options">
    <SortFilter />
  </section>
</template>

<script setup lang="ts">
import SortFilter from './SortFilter.vue'
// Что я хочу?
// [__] У меня будет стора, делающая запрос discover к api
// объект со всеми фильтрами, или не объект даже, а отдельные переменные
// и он будет связан с фильтрами, через v-model
</script>

<style scoped>
.filter-options {
  display: flex;
  align-items: center;
}
</style>
