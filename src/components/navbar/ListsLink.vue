<template>
  <RouterLink :to="lists?.path as RouteLocationRaw" class="btn-wrapper">
    <div class="link-title">
      <v-icon icon="mdi-format-list-bulleted" />
      <h4>{{ lists?.name }}</h4>
    </div>
    <span>
      <IconSpinner v-if="props.isLoading" />
      <p v-else="!props.isLoading">{{ props.titles }}</p>
    </span>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink, type RouteLocationRaw } from 'vue-router'
import IconSpinner from '../error-handling/IconSpinner.vue'
import { profileRoutes } from '@/router'

interface IListsLink {
  isLoading: boolean
  titles: number | null
}

const props = defineProps<IListsLink>()

const lists = profileRoutes.find((route) => route.name === 'Lists')
</script>

<style scoped>
.btn-wrapper {
  color: var(--snow-white);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 400;
  gap: 0.25rem;
  padding: 0.4rem;
  border-radius: var(--radius);
}

.btn-wrapper:hover {
  background: rgba(236, 236, 236, 25%);
}

.link-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
}
</style>
