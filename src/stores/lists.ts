import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useListsStore = defineStore('lists', () => {
  const query = ref<string>('')
  const isSearchSubmited = ref(false)

  const createNewList = async () => {
    try {
    } catch (error) {}
  }

  return { query, isSearchSubmited }
})
