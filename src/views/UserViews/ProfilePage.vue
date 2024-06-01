<template>
  <div class="profile-page-container">
    <h4>
      My
      {{
        (route.name as string).toLowerCase() === 'rated'
          ? `rated list`
          : (route.name as string).toLowerCase()
      }}
    </h4>
    <PaginatedList
      :isLoading="isLoading"
      :error="error"
      :movies="movies"
      :lists="lists"
      :total_pages="total_pages"
      :total_results="total_results"
      @set-next-page="(new_page) => setPage(new_page)"
      @set-prev-page="(new_page) => setPage(new_page)"
      @set-this-page="(new_page) => setPage(new_page)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import type { IRatedMovie } from '@/interfaces/account-types'
import type { IMovie } from '@/interfaces/movie-types'
import getFavoritesMovies from '@/api/account/getFavorites'
import getWatchlistMovies from '@/api/account/getWatchlist'
import type { IList } from '@/interfaces/lists-types'
import getLists from '@/api/account/getLists'
import getRatedMovies from '@/api/account/getRatedMovies'
import PaginatedList from '@/components/paginated-list/PaginatedList.vue'
import { useUserStore } from '@/stores/user'

const account_id = ref<number | null>(null)
const setAccountId = (id: number) => {
  account_id.value = id
}

const user = useUserStore()

const route = useRoute()
const movies = ref<IRatedMovie[] | IMovie[] | null>()
const lists = ref<IList[] | null>(null)
const error = ref<string | null>(null)
const isLoading = ref(false)
const page = ref(1)
const setPage = (new_page: number) => {
  page.value = new_page
}
const total_pages = ref(1)
const total_results = ref(1)

const fetchList = async (route_name: string, page_value: number) => {
  let response = null
  isLoading.value = true
  error.value = null
  movies.value = null
  lists.value = null
  try {
    if (route_name.toLowerCase() === 'favorites') {
      response = await getFavoritesMovies(page_value)
      movies.value = response.results
      total_pages.value = response.total_pages
      total_results.value = response.total_results
    }
    if (route_name.toLowerCase() === 'watchlist') {
      response = await getWatchlistMovies(page_value)
      movies.value = response.results
      total_pages.value = response.total_pages
      total_results.value = response.total_results
    }
    if (route_name.toLowerCase() === 'lists') {
      response = await getLists()
      lists.value = response.results
      total_pages.value = response.total_pages
      total_results.value = response.total_results
    }
    if (route_name.toLowerCase() === 'rated') {
      response = await getRatedMovies(page_value)
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
  if (route.name || page.value) {
    fetchList(route.name as string, page.value)
  }
})

function copmputed(
  arg0: () => import('vue-router').RouteLocationNormalizedLoaded
) {
  throw new Error('Function not implemented.')
}
</script>

<style scoped>
.profile-page-container {
  box-sizing: border-box;
}

h4 {
  text-align: center;
  margin-bottom: 1rem;
}
</style>
