<template>
  <RouterLink
    :to="watchlist?.path as RouteLocationRaw"
    class="watchlist-btn-wrapper"
  >
    <v-icon icon="mdi-bookmark-plus-outline" />
    <h4>Watchlist</h4>
    <span>{{ user.isLoading ? '...' : user.titles }}</span>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink, type RouteLocationRaw } from 'vue-router'
import { profileRoutes } from '@/router'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const user = useUserStore()

const watchlist = profileRoutes.find((route) => route.name === 'Watchlist')

onMounted(() => {
  user.fetchWatchlistTitles()
})
</script>

<style scoped>
.watchlist-btn-wrapper {
  color: var(--snow-white);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 400;
  gap: 0.25rem;
  padding: 0.4rem;
  border-radius: var(--radius);
}

.watchlist-btn-wrapper:hover {
  background: rgba(236, 236, 236, 25%);
}

.watchlist-btn-wrapper span {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background-color: orange;
  padding: 0rem 0.5rem;
  font-size: 0.875rem;
}
</style>
