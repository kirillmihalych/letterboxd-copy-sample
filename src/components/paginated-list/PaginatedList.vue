<template>
  <article class="paginated-list">
    <div class="active info-display">
      <p v-if="isLoading">...</p>
      <p v-if="!isLoading">
        There are {{ total_pages }} pages and {{ props.total_results }} movies
      </p>
    </div>

    <div class="btns-container">
      <p class="active page-display">You are on a page {{ page }}</p>
      <button
        @click="setPrevPage"
        :disabled="page === 1"
        class="page-control-btn"
      >
        prev page
      </button>

      <button
        v-for="n in range"
        :key="n"
        @click="setPage(n)"
        class="page-control-btn"
        :class="{ active: n === page }"
        :disabled="n > total_pages"
      >
        {{ n }}
      </button>
      <button class="page-control-btn" @click="displayMorePages">more</button>
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
  </article>
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

const page = ref(1)
const setNextPage = () => {
  if (range.value.includes(page.value)) {
    page.value += 1
  } else {
    console.log(range.value)
    page.value = range.value[0]
  }
  console.log()

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

const range = ref<number[]>([1, 2, 3, 4, 5])

const displayMorePages = () => {
  for (let i = 0; i < 5; i++) {
    range.value[i] = range.value[i] + 5
  }
}
</script>

<style scoped>
.paginated-list {
  /* width: 950px; */
  box-sizing: border-box;
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
  justify-content: space-between;
  width: 950px;
  gap: 0.5rem;
}

.page-control-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  border: none;
  padding: 0.75rem;
  background: darkgray;
}

.page-display {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 50px;
  font-weight: bold;
  color: #222;
  box-sizing: border-box;
}

.info-display {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 1rem;
  box-sizing: border-box;
}

.page-control-btn:hover {
  background: lightgray;
  cursor: pointer;
}

.active {
  border: #651fff 2px solid;
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
