<template>
  <section class="upcoming-movies-container">
    <header>
      <div class="title-container">
        <h2>Popular movies</h2>
        <span class="filters-container">
          <SortOptionList />
        </span>
      </div>
      <p class="list-overview">
        This rating based on next 356 days upcoming movies.
      </p>
      <hr />
    </header>
    <div class="fetch-handle-container" v-if="loading">
      <SpinnerComp />
    </div>
    <div v-if="error" class="fetch-handle-container">
      <h3>{{ error }}</h3>
    </div>
    <div v-if="upcomingMovies">
      <UpcomingMovieList :movies="upcomingMovies" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { IDiscoverOptions, IMovie } from '@/types'
import UpcomingMovieList from '@/components/movie-lists/UpcomingMovieList.vue'
import { onMounted, ref, watchEffect } from 'vue'
import { loadUpcomingMovies } from '@/api'
import useFiltersStore from '@/stores/filters'
import SpinnerComp from '@/components/error-handling/SpinnerComp.vue'
import SortOptionList from '@/components/sort/SortOptionList.vue'

const upcomingMovies = ref<IMovie[] | null>(null)
const error = ref<string | null>(null)
const loading = ref(false)
const filters = useFiltersStore()

const fetchUpcomingMovies = async (filters: IDiscoverOptions) => {
  upcomingMovies.value = null
  error.value = null
  try {
    loading.value = true
    upcomingMovies.value = await loadUpcomingMovies(filters)
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value =
        err.message.toString() + ' ' + 'Возможно, у Вас выключен VPN.'
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUpcomingMovies(filters.selectedOptions)
})

watchEffect(() => {
  fetchUpcomingMovies(filters.selectedOptions)
})
</script>

<style scoped>
.upcoming-movies-container {
  box-sizing: border-box;
  width: 950px;
  padding: 1rem;
}

.title-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.filters-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.list-overview {
  width: 950px;
}
</style>
