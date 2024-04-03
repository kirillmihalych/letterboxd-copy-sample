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
  const error = ref<string | null>(null)
  const loading = ref(false)

  const fetchDiscoveredMovies = async (options: IDiscoverOptions) => {
    discoveredMovieList.value = null
    error.value = null

    try {
      loading.value = true
      discoveredMovieList.value = await doDiscoverMovies(options)
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message.toString()
      }
    } finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    fetchDiscoveredMovies(selectedOptions.value)
  })

  return { selectedOptions, discoveredMovieList }
})

export default useFiltersStore
