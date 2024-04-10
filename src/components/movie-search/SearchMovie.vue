<template>
  <div>
    <form class="find-film-form">
      <label for="query">Find a film</label>
      <input
        type="text"
        placeholder="Type film's name"
        id="query"
        autocomplete="off"
        :value="query"
        @input="changeQueryHandler"
        @focusout="doCloseDropDownList"
        @focus="doShowDropDownList"
      />
    </form>
    <div class="drop-down-list" v-show="isDropDownListShowed">
      <MovieDropCard
        v-for="movie in offeredList"
        :key="movie.id"
        :movie="movie"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { IMovie } from '@/interfaces/movie-types'
import { fetchByTitle } from '@/api/movie'
import { debounce } from 'lodash'
import MovieDropCard from '../movie-cards/MovieDropCard.vue'

const query = ref('')
const offeredList = ref<IMovie[] | null>(null)
const error = ref<string | null>(null)
const loading = ref(false)
const isDropDownListShowed = ref(false)

const fetchMovieListByQuery = async (query: string) => {
  try {
    loading.value = true
    offeredList.value = await fetchByTitle(query)
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value =
        err.message.toString() +
        '. Возможно, Ваш VPN отключен. Попробуйте включить VPN.'
    }
  } finally {
    loading.value = false
  }
}

watchEffect(() => {
  fetchMovieListByQuery(query.value)
})

const doShowDropDownList = () => {
  if (query.value.length > 0) {
    isDropDownListShowed.value = true
  }
}

const doCloseDropDownList = () => {
  isDropDownListShowed.value = false
}

const changeQueryHandler = debounce((e: Event) => {
  const target = e.target as HTMLInputElement
  query.value = target.value
  if (target.value.length < 1) {
    doCloseDropDownList()
  } else {
    doShowDropDownList()
  }
}, 300)
</script>

<style scoped>
.drop-down-list {
  height: 100px;
  overflow-y: scroll;
  position: absolute;
}

.find-film-form {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}
</style>
