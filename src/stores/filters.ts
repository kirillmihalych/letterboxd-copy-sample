import getFilteredMovies from '@/api/movies/getFilteredMovies'
import type { IMovie } from '@/interfaces/movie-types'
import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'

export const useFilterStore = defineStore('filters', () => {
  const movies = ref<IMovie[] | null>(null)
  const error = ref<string | null>(null)
  const isLoading = ref(false)
  const pages = ref(0)

  const sort = ref('')
  const genres = ref<number[]>([])
  const releaseDateFrom = ref('')
  const releaseDateTo = ref('')
  const rating = ref('')
  const votes = ref('10000')

  const fetchFilteredMovies = async () => {
    try {
      isLoading.value = true
      const response = await getFilteredMovies(
        sort.value,
        genres.value.join(','),
        releaseDateFrom.value,
        releaseDateTo.value,
        String(rating.value),
        votes.value
      )
      movies.value = response.results
      pages.value = response.total_pages
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message.toString() + ' ' + 'Something went wrong.'
      }
    } finally {
      isLoading.value = false
    }
  }

  watchEffect(() => {
    fetchFilteredMovies()
  })

  return {
    movies,
    isLoading,
    error,
    pages,
    sort,
    genres,
    releaseDateFrom,
    releaseDateTo,
    rating,
    votes,
  }
})
