<template>
  <RouterLink
    :to="watchlist?.path as RouteLocationRaw"
    class="watchlist-btn-wrapper"
  >
    <v-icon icon="mdi-bookmark-plus-outline" />
    <h4>Watchlist</h4>
    <span>{{ isLoading ? '...' : titles }}</span>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink, type RouteLocationRaw } from 'vue-router'
import { profileRoutes } from '@/router'
import getWatchlistMovies from '@/api/account/getWatchlist'
import { onMounted, ref } from 'vue'

const watchlist = profileRoutes.find((route) => route.name === 'Watchlist')

const isLoading = ref(false)
const titles = ref<number | null>(null)

const fetchWatchlistTotal = async () => {
  try {
    isLoading.value = true
    titles.value = (await getWatchlistMovies(1)).total_results
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchWatchlistTotal()
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
  background-color: orange;
  padding: 0rem 0.5rem;
  border-radius: var(--radius);
  font-size: 0.875rem;
}
</style>
