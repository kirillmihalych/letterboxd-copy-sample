import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IGenre } from '@/types'

const useFiltersStore = defineStore('filters', () => {
  const selectedGenres = ref<Map<number, string>>(new Map())

  return { selectedGenres }
})

export default useFiltersStore
