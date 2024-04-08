<template>
  <section class="popular-movie-list-container">
    <div class="fetch-handle-container" v-if="loading">
      <SpinnerComp />
    </div>
    <div v-if="error" class="fetch-handle-container">
      <h3>{{ error }}</h3>
    </div>
    <div v-if="popularMovieList">
      <PopularMovieList :movieList="popularMovieList" />
      <div v-show="popularMovieList.length < 1">
        No films match your filter options.<br />
        Please, change them or just clear filter-options.
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SpinnerComp from '@/components/error-handling/SpinnerComp.vue'
import PopularMovieList from '@/components/filters/PopularMovieList.vue'
import { loadPopularMovies, loadVideoById } from '@/api'
import type { IDiscoverOptions, IMovie } from '@/types'
import { onMounted, ref, watchEffect } from 'vue'
import useFiltersStore from '@/stores/filters'

const filterStore = useFiltersStore()

const popularMovieList = ref<IMovie[] | null>(null)
const error = ref<string | null>(null)
const loading = ref(false)

const fetchPopularMovieList = async (filters: IDiscoverOptions) => {
  popularMovieList.value = null
  error.value = null

  try {
    loading.value = true
    popularMovieList.value = await loadPopularMovies(filters)
    await loadVideoById(634492)
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value =
        err.message.toString() + '. ' + 'Возможно, у вас выключен VPN.'
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPopularMovieList(filterStore.selectedOptions)
})

watchEffect(() => {
  fetchPopularMovieList(filterStore.selectedOptions)
  console.log('options changed')
})
</script>

<style scoped>
.fetch-handle-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 500px;
}

.popular-movie-list-container {
  box-sizing: border-box;
  width: 950px;
  padding: 0.5rem;
}
</style>
