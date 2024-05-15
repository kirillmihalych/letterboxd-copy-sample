<template>
  <div class="films-page-container">
    <nav class="filters-container">
      <MovieNavbar />
      <FilterList
        @set-genres="(genres) => setGenres(genres)"
        @set-sort-option="(option) => setSortOption(option)"
        @set-votes-amount="(votes) => setVotesAmount(votes)"
      />
    </nav>
    <main class="movies-content">
      <PaginatedList
        :isLoading="isLoading"
        :error="error"
        :movies="movies"
        :total_pages="total_pages"
        :total_results="total_results"
        @set-next-page="(new_page) => setPage(new_page)"
        @set-prev-page="(new_page) => setPage(new_page)"
        @set-this-page="(new_page) => setPage(new_page)"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import FilterList from '@/components/filters/FilterList.vue'
import MovieNavbar from '@/components/filters/MovieNavbar.vue'
import PaginatedList from '@/components/paginated-list/PaginatedList.vue'
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import type { IFilterOptions, IMovie } from '@/interfaces/movie-types'
import getTopRatedMovies from '@/api/movies/getTopRatedMovies'
import getUpcomingMovies from '@/api/movies/getUpcomingMovies'
import getPopularMovies from '@/api/movies/getPopularMovies'

const route = useRoute()
const movies = ref<IMovie[] | null>()
const error = ref<string | null>(null)
const isLoading = ref(false)
const defaultOptions: IFilterOptions = {
  genres: [],
  sort_by: '',
  min_amount_votes: '250',
  page: 1,
  from_primary_release: '',
  to_primary_release: '',
}
const options = ref<IFilterOptions>(defaultOptions)
const setPage = (new_page: number) => {
  // @ts-ignore
  options.value.page = new_page
}
const setGenres = (genres: number[]) => {
  options.value.genres = genres
}
const setSortOption = (option: string) => {
  options.value.sort_by = option
}
const setVotesAmount = (votes: string) => {
  options.value.min_amount_votes = votes
}
const total_pages = ref(1)
const total_results = ref(0)

const fetchFilteredMovies = async () => {
  let response = null
  total_pages.value = 10
  isLoading.value = true
  error.value = null
  movies.value = null
  try {
    if ((route.name as string).toLowerCase() === 'popularity') {
      response = await getPopularMovies(options.value)
      movies.value = response.results
      total_pages.value = response.total_pages
      total_results.value = response.total_results
    }

    if ((route.name as string).toLowerCase() === 'upcoming release') {
      response = await getUpcomingMovies(options.value)
      movies.value = response.results
      total_pages.value = response.total_pages
      total_results.value = response.total_results
    }

    if ((route.name as string).toLowerCase() === 'top rating') {
      response = await getTopRatedMovies(options.value)
      movies.value = response.results
      total_pages.value = response.total_pages
      total_results.value = response.total_results
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value =
        err.message.toString() + '. ' + 'Probably, your vpn is turned off.'
    }
  } finally {
    isLoading.value = false
  }
}

watchEffect(() => {
  if (route.name) {
    fetchFilteredMovies()
  }
})
</script>

<style scoped>
.films-page-container {
  box-sizing: border-box;
  margin: 0 auto;
  width: 950px;
}
</style>
