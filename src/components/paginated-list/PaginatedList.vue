<template>
  <div class="paginated-list">
    <div class="btns-container">
      <button
        @click="setPrevPage"
        :disabled="page === 1"
        class="page-control-btn"
      >
        prev page
      </button>
      <button
        v-for="n in props.total_pages"
        :key="n"
        @click="setPage(n)"
        class="page-control-btn"
        :class="{ active: n === page }"
      >
        {{ n }}
      </button>
      <button
        @click="setNextPage"
        :disabled="page === props.total_pages"
        class="page-control-btn"
      >
        next page
      </button>
    </div>
    <div v-if="props.isLoading" class="loading">
      <SpinnerComp />
    </div>
    <div v-if="props.error && !props.isLoading" class="error-message">
      {{ props.error }}
    </div>
    <div v-if="!props.isLoading && !props.error" class="page-content">
      <div class="movies-container" v-if="movies">
        <FilmCard
          v-for="movie in props.movies"
          :key="movie.id"
          :movie="movie"
        />
      </div>
      <div v-if="lists" class="lists-container">
        <RouterLink
          v-for="list in props.lists"
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
import type { IRatedMovie } from '@/interfaces/account-types'
import type { IList } from '@/interfaces/lists-types'
import type { IMovie } from '@/interfaces/movie-types'
import { ref } from 'vue'
import FilmCard from '@/components/movie-cards/FilmCard.vue'
import SpinnerComp from '@/components/error-handling/SpinnerComp.vue'

interface IPaginatedList {
  lists?: IList[] | null
  movies?: IMovie[] | IRatedMovie[] | null
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

const page = ref(1)
const setNextPage = () => {
  page.value += 1
  emits('set-next-page', page.value)
}

const setPrevPage = () => {
  page.value -= 1
  emits('set-prev-page', page.value)
}

const setPage = (selected_page: number) => {
  page.value = selected_page
  emits('set-this-page', page.value)
}
</script>

<style scoped>
.paginated-list {
  /* width: 950px; */
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
  width: 100%;
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
