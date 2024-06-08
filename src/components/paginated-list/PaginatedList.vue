<template>
  <article class="paginated-list">
    <div v-if="props.isLoading" class="loading">
      <SpinnerComp />
    </div>
    <div v-if="props.error && !props.isLoading" class="error-message">
      {{ props.error }}
    </div>
    <div v-if="!props.isLoading && !props.error" class="page-content">
      <MovieListWrapper v-if="movies">
        <template #movie-cards>
          <FilmCard
            v-for="movie in props.movies"
            :key="movie.id"
            :movie="movie"
          />
        </template>
      </MovieListWrapper>
      <div v-if="lists" class="lists-container">
        <RouterLink
          v-for="list in props.lists"
          :key="list.id"
          :list="list"
          :to="`/profile/lists/${list.id}`"
          class="list-link"
        >
          <ProfileListCard :list_id="list.id" />
        </RouterLink>
      </div>
    </div>
    <footer v-if="!props.isLoading">
      <div class="btns-container">
        <button
          @click="setPrevPage"
          :disabled="page === 1 || props.isLoading"
          class="page-control-btn"
        >
          <v-icon icon="mdi-arrow-left-bold-box-outline" />
        </button>
        <button
          v-for="n in range"
          :key="n"
          @click="setPage(n)"
          class="page-control-btn"
          :class="{ active: n === page }"
          :disabled="n > total_pages || props.isLoading"
        >
          {{ n }}
        </button>
        <button
          class="page-control-btn"
          @click="displayMorePages"
          :disabled="props.isLoading"
          v-if="total_pages > 5"
        >
          ...
        </button>
        <button
          @click="setNextPage"
          :disabled="page === props.total_pages || props.isLoading"
          class="page-control-btn"
        >
          <v-icon icon="mdi-arrow-right-bold-box-outline" />
        </button>
      </div>
    </footer>
  </article>
</template>

<script setup lang="ts">
import type { IRatedMovie } from '@/interfaces/account-types'
import type { IList } from '@/interfaces/lists-types'
import type { IMovie } from '@/interfaces/movie-types'
import { ref } from 'vue'
import FilmCard from '@/components/movie-cards/FilmCard.vue'
import SpinnerComp from '@/components/error-handling/SpinnerComp.vue'
import MovieListWrapper from './MovieListWrapper.vue'
import ProfileListCard from '@/views/UserViews/ProfileListCard.vue'
import { useFilterStore } from '@/stores/filters'

const store = useFilterStore()

interface IPaginatedList {
  lists?: IList[] | null
  movies?: IMovie[] | IRatedMovie[] | null
  total_results?: number
  total_pages: number
  isLoading: boolean
  error: string | null
}

const props = defineProps<IPaginatedList>()
const emits = defineEmits<{
  (e: 'set-next-page', payload: number): void
  (e: 'set-prev-page', payload: number): void
  (e: 'set-this-page', payload: number): void
}>()

const posterBaseURL = 'https://image.tmdb.org/t/p/w154'

const page = ref(1)
const setNextPage = () => {
  const nextPage = page.value + 1
  const isNextPageInRange = range.value.includes(nextPage)
  const setNext = () => (page.value += 1)
  const setNextInStore = () => (store.page = page.value.toString())
  if (!isNextPageInRange) {
    displayMorePages()
  } else if (isNextPageInRange) {
    setNext()
    setNextInStore()
  }
  emits('set-next-page', page.value)
}

const setPrevPage = () => {
  const prevPage = page.value - 1
  const setPrev = () => (page.value -= 1)
  const isPrevPageInRange = range.value.includes(prevPage)
  const setPrevInStore = () => (store.page = page.value.toString())
  if (!isPrevPageInRange) {
    displayLessPages()
  } else if (isPrevPageInRange) {
    setPrev()
    setPrevInStore()
  }

  emits('set-prev-page', page.value)
}

const setPage = (selected_page: number) => {
  page.value = selected_page
  store.page = selected_page.toString()
  emits('set-this-page', page.value)
}

const range = ref<number[]>([1, 2, 3, 4, 5])

const displayMorePages = () => {
  for (let i = 0; i < 5; i++) {
    range.value[i] = range.value[i] + 5
  }
  const firstPageInRange = range.value[0]
  setPage(firstPageInRange)
  store.page = range.value[0].toString()
}

const displayLessPages = () => {
  for (let i = 4; i >= 0; i--) {
    range.value[i] = range.value[i] - 5
  }
  const lastPageInRange = range.value[range.value.length - 1]
  const setPageInStore = () => (store.page = lastPageInRange.toString())
  setPage(lastPageInRange)
  setPageInStore()
}
</script>

<style scoped>
.paginated-list {
  min-height: 900px;
  /* min-height: 75vh; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.btns-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  margin-top: 1rem;
}

.page-control-btn {
  border-radius: var(--radius);
  background-color: slategray;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  font-weight: 800;
}

.page-control-btn:hover {
  cursor: pointer;
  background-color: orange;
}

.active {
  border: 2px solid #222;
}

.header-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.loading {
  width: 100%;
  min-height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lists-container {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  justify-content: center;
  align-items: start;
}

.list-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 950px;
  background: var(--light-grey);
  color: var(--snow-white);
  border-radius: var(--radius);
  height: 170px;
}

.list-link:hover {
  background: lightslategray;
}
</style>
