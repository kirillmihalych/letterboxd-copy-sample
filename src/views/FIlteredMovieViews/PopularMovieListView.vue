<template>
  <section class="popular-movie-list-container">
    <header>
      <div class="title-container">
        <h2>Popular movies</h2>
        <span class="filters-container">
          <GenreList />
          <VotesAmountInput />
          <button @click="clearFilterOptions">clear filters</button>
        </span>
      </div>
      <p class="list-overview">
        This rating based on metrics like number of votes for the day, number of
        views for the day, number of users who marked it as a "favourite" for
        the day, number of users who added it to their "watchlist" for the day,
        release date, number of total votes and previous days score.
      </p>
      <hr />
    </header>
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
import PopularMovieList from '@/components/movie-lists/PopularMovieList.vue'
import { loadPopularMovies, loadVideoById } from '@/api'
import type { IDiscoverOptions, IMovie } from '@/types'
import { onMounted, ref, watchEffect } from 'vue'
import useFiltersStore from '@/stores/filters'
import GenreList from '@/components/movie-forms/genres/GenreList.vue'
import VotesAmountInput from '@/components/movie-forms/rating/VotesAmountInput.vue'

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

const clearFilterOptions = () => {
  filterStore.selectedOptions.genres = []
  filterStore.selectedOptions.sort_by = ''
}
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
