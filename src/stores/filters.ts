import { ref, computed, type Ref, watchEffect } from 'vue'
import { defineStore } from 'pinia'
import type { IDiscoverOptions, IGenre, IMovie } from '@/types'
import { doDiscoverMovies } from '@/api'

interface IFilterStore {
  selectedOptions: Ref<IDiscoverOptions>
}

const useFiltersStore = defineStore('filters', () => {
  const defaultOptions: IDiscoverOptions = {
    genres: [],
    sort_by: '',
    min_amount_votes: '250',
  }

  const selectedOptions = ref<IDiscoverOptions>(defaultOptions)
  const discoveredMovieList = ref<IMovie[] | null>(null)
  const amountOfMovies = ref(0)
  const error = ref<string | null>(null)
  const loading = ref(false)

  const fetchDiscoveredMovies = async (options: IDiscoverOptions) => {
    discoveredMovieList.value = null
    error.value = null

    try {
      loading.value = true
      const { results, total_results } = await doDiscoverMovies(options)
      discoveredMovieList.value = results
      amountOfMovies.value = total_results
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value =
          err.message.toString() +
          '. Возможно, Ваш VPN отключен. Попробуйте включить VPN.'
      }
    } finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    fetchDiscoveredMovies(selectedOptions.value)
  })

  return {
    selectedOptions,
    discoveredMovieList,
    amountOfMovies,
    error,
    loading,
  }
})

export default useFiltersStore