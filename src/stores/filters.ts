import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IFilters, IGenre } from '@/types'

const useFiltersStore = defineStore('filters', () => {
  const defaultFilters: IFilters = {
    decade: '',
    year: '',
    genre: 10770,
  }

  const selectedFilters = ref<IFilters>(defaultFilters)

  return { selectedFilters }
})

export default useFiltersStore
