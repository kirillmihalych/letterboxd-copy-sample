import getAccountDetails from '@/api/account/getAccountDetails'
import getFavoritesMovies from '@/api/account/getFavorites'
import getLists from '@/api/account/getLists'
import getRatedMovies from '@/api/account/getRatedMovies'
import getWatchlistMovies from '@/api/account/getWatchlist'
import type { IAccountDetails } from '@/interfaces/account-types'
import { defineStore } from 'pinia'
import { onMounted, ref, watchEffect } from 'vue'

export const useUserStore = defineStore('user', () => {
  const accountDetails = ref<IAccountDetails | null>(null)
  const isLoadingAccount = ref(false)

  const fetchAccountDetails = async () => {
    try {
      isLoadingAccount.value = true
      accountDetails.value = await getAccountDetails()
    } catch (error) {
      console.log(error)
    } finally {
      isLoadingAccount.value = false
    }
  }

  onMounted(() => {
    fetchAccountDetails()
  })

  const watchlistTitles = ref<number | null>(null)
  const fetchWatchlistTitles = async () => {
    try {
      isLoading.value = true
      watchlistTitles.value = (await getWatchlistMovies(1)).total_results
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message.toString())
      }
    } finally {
      isLoading.value = false
    }
  }
  const favoriteTitles = ref<number | null>(null)
  const fetchFavoriteTitles = async () => {
    try {
      isLoading.value = true
      favoriteTitles.value = (await getFavoritesMovies(1)).total_results
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message.toString())
      }
    } finally {
      isLoading.value = false
    }
  }

  const ratedTitles = ref<number | null>(null)
  const fetchRatedTitles = async () => {
    try {
      isLoading.value = true
      ratedTitles.value = (await getRatedMovies(1)).total_results
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message.toString())
      }
    } finally {
      isLoading.value = false
    }
  }

  const lists = ref<number | null>(null)
  const isLoading = ref(false)
  const fetchTitles = async () => {
    try {
      isLoading.value = true
      watchlistTitles.value = (await getWatchlistMovies(1)).total_results
      favoriteTitles.value = (await getFavoritesMovies(1)).total_results
      ratedTitles.value = (await getRatedMovies(1)).total_results
      lists.value = (await getLists()).total_results
    } catch (error) {
      console.log(error)
    } finally {
      isLoading.value = false
    }
  }

  watchEffect(() => {
    fetchTitles()
  })

  return {
    accountDetails,
    fetchTitles,
    watchlistTitles,
    fetchWatchlistTitles,
    favoriteTitles,
    fetchFavoriteTitles,
    ratedTitles,
    fetchRatedTitles,
    lists,
    isLoading,
    isLoadingAccount,
  }
})
