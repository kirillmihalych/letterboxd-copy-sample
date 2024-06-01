<template>
  <RouterLink :to="rated?.path as RouteLocationRaw" class="btn-wrapper">
    <div class="link-title">
      <v-icon icon="mdi-star" />
      <h4>{{ rated?.name }}</h4>
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

interface IRatedLink {
  isLoading: boolean
  titles: number | null
}

const props = defineProps<IRatedLink>()

const rated = profileRoutes.find((route) => route.name === 'Rated')
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
