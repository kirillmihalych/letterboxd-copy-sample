<template>
  <section class="movies-top-rated-container">
    <header>
      <div class="title-container">
        <h2>Top rated movies</h2>
        <span class="filters-container">
          <DateFilterInput />
          <GenreList />
          <VotesAmountInput />
          <button @click="clearFilterOptions">clear filters</button>
        </span>
      </div>
      <p class="list-overview">
        This rating based on a movie rating and a minimun 200 votes count.
      </p>
      <hr />
    </header>
    <div class="fetch-handle-container" v-if="loading">
      <SpinnerComp />
    </div>
    <div v-if="error">{{ error }}</div>
    <div v-if="topRatedMovies">
      <TopRatedMovieList :movies="topRatedMovies" />
    </div>
  </section>
</template>

<script setup lang="ts">
import TopRatedMovieList from '@/components/filters/TopRatedMovieList.vue'
import VotesAmountInput from '@/components/filters/rating/VotesAmountInput.vue'
import GenreList from '@/components/filters/genres/GenreList.vue'
import { loadTopRatedMovies } from '@/api'
import SpinnerComp from '@/components/error-handling/SpinnerComp.vue'
import { onMounted, ref, watchEffect } from 'vue'
import type { IDiscoverOptions, IMovie } from '@/types'
import useFiltersStore from '@/stores/filters'
import DateFilterInput from '@/components/filters/dates/DateFilterInput.vue'

const topRatedMovies = ref<IMovie[] | null>(null)
const error = ref<string | null>(null)
const loading = ref(false)
const filters = useFiltersStore()

const fetchTopRatedMovies = async (filters: IDiscoverOptions) => {
  error.value = null
  topRatedMovies.value = null

  try {
    loading.value = true
    topRatedMovies.value = await loadTopRatedMovies(filters)
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value =
        err.message.toString() + ' ' + 'Возможно, у вас выключен VPN.'
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchTopRatedMovies(filters.selectedOptions)
})

watchEffect(() => {
  fetchTopRatedMovies(filters.selectedOptions)
})

const clearFilterOptions = () => {
  filters.selectedOptions.genres = []
  filters.selectedOptions.sort_by = ''
}
</script>

<style scoped>
.movies-top-rated-container {
  width: 950px;
  box-sizing: border-box;
  padding: 0.75rem;
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
