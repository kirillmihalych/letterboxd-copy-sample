<template>
  <div class="paginated-list">
    <div class="btns-container">
      <button
        @click="page -= 1"
        :disabled="page === 1"
        class="page-control-btn"
      >
        prev page
      </button>
      <button
        v-for="n in total_pages"
        :key="n"
        @click="page = n"
        class="page-control-btn"
        :class="{ active: n === page }"
      >
        {{ n }}
      </button>
      <button
        @click="page += 1"
        :disabled="page === total_pages"
        class="page-control-btn"
      >
        next page
      </button>
    </div>
    <div v-if="isLoading" class="loading">
      <SpinnerComp />
    </div>
    <div v-if="error && !isLoading" class="error-message">
      {{ error }}
    </div>
    <div v-if="!isLoading && !error" class="page-content">
      <div class="movies-container" v-if="movies">
        <FilmCard v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>
      <div v-if="lists" class="lists-container">
        <RouterLink
          v-for="list in lists"
          :key="list.id"
          :list="list"
          :to="`/profile/lists/${list.id}`"
          class="list-link"
        >
          <p>{{ list.name }}</p>
          <p>{{ list.item_count }} films</p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import type { IRatedMovie } from '@/interfaces/account-types'
import type { IMovie } from '@/interfaces/movie-types'
import FilmCard from '@/components/movie-cards/FilmCard.vue'
import getFavoritesMovies from '@/api/account/getFavorites'
import getWatchlistMovies from '@/api/account/getWatchlist'
import SpinnerComp from '@/components/error-handling/SpinnerComp.vue'
import type { IList } from '@/interfaces/lists-types'
import getLists from '@/api/account/getLists'
import getRatedMovies from '@/api/account/getRatedMovies'

const route = useRoute()
const movies = ref<IRatedMovie[] | IMovie[] | null>()
const lists = ref<IList[] | null>(null)
const error = ref<string | null>(null)
const isLoading = ref(false)
const page = ref(1)
const total_pages = ref(1)

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
    }
    if (route_name.toLowerCase() === 'watchlist') {
      response = await getWatchlistMovies(page_value)
      movies.value = response.results
      total_pages.value = response.total_pages
    }
    if (route_name.toLowerCase() === 'lists') {
      response = await getLists()
      lists.value = response.results
      total_pages.value = response.total_pages
    }
    if (route_name.toLowerCase() === 'rated') {
      response = await getRatedMovies(page_value)
      movies.value = response.results
      total_pages.value = response.total_pages
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
</script>

<style scoped>
.paginated-list {
  display: flex;
  justify-content: center;
  align-items: start;
  margin-top: 2rem;
  flex-direction: column;
}

.page-content {
  width: 950px;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
  align-items: start;
  flex-direction: column;
}

.movies-container {
  width: 950px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2.25rem;
  margin: 1rem 0;
  flex-wrap: wrap;
}

.loading {
  min-height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-message {
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.btns-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.page-control-btn {
  border: none;
  padding: 0.75rem;
  background: darkgray;
}

.page-control-btn:hover {
  background: lightgray;
  cursor: pointer;
}

.active {
  background: lightgrey;
}

.lists-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 1rem;
}

.list-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 920px;
  text-decoration: none;
  padding: 15px;
  color: #222;
  background: slategray;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}

.list-link:hover {
  background: lightslategray;
}
</style>
