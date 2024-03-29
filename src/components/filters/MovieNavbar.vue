<template>
  <div>Загрузить по</div>
  <RouterLink to="/films/popular">Популярность</RouterLink>
  <RouterLink to="/films/upcoming"> Грядущие </RouterLink>
  <RouterLink to="/films/top_rated"> Высоко оценённые</RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped></style>
