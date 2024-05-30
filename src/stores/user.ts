import getAccountDetails from '@/api/account/getAccountDetails'
import getWatchlistMovies from '@/api/account/getWatchlist'
import type { IAccountDetails } from '@/interfaces/account-types'
import { defineStore } from 'pinia'
import { onMounted, ref, watchEffect } from 'vue'

export const useUserStore = defineStore('user', () => {
  const accountDetails = ref<IAccountDetails | null>(null)

  const fetchAccountDetails = async () => {
    accountDetails.value = await getAccountDetails()
  }

  onMounted(() => {
    fetchAccountDetails()
  })

  const titles = ref<number | null>(null)
  const isLoading = ref(false)
  const fetchWatchlistTitles = async () => {
    try {
      isLoading.value = true
      titles.value = (await getWatchlistMovies(1)).total_results
    } catch (error) {
      console.log(error)
    } finally {
      isLoading.value = false
    }
  }

  watchEffect(() => {
    fetchWatchlistTitles()
  })

  return { accountDetails, fetchWatchlistTitles, titles, isLoading }
})
