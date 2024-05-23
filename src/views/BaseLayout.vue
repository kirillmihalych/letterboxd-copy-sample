<template>
  <div class="base-layout-container">
    <div>
      <div class="fetch-handle-container" v-if="loadingMovie">
        <SpinnerComp />
      </div>
      <div v-if="errorMovie">{{ errorMovie }}</div>
      <div v-if="movieList">
        <CarouselComponent :items="movieList">
          <template #header>
            <header class="films-view-header">
              <MovieNavbar />
            </header>
          </template>
          <template #item="slotProps">
            <FilmCard :movie="slotProps.item" />
          </template>
        </CarouselComponent>
      </div>
    </div>
    <hr />
    <div>
      <div class="fetch-handle-container" v-if="loadingPeople">
        <SpinnerComp />
      </div>
      <div v-if="errorPeople">{{ errorPeople }}</div>
      <div v-if="people">
        <CarouselComponent :items="people">
          <template #item="slotProps">
            <PersonCard :person="slotProps.item" />
          </template>
        </CarouselComponent>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SpinnerComp from '@/components/error-handling/SpinnerComp.vue'
import CarouselComponent from '@/components/generic-carousel/CarouselComponent.vue'
import MovieNavbar from '@/components/filters/MovieNavbar.vue'
import FilmCard from '@/components/movie-cards/FilmCard.vue'
import PersonCard from '@/components/movie-cards/PersonCard.vue'

import type { IMovie, IPerson } from '@/interfaces/movie-types'
import { onMounted, ref } from 'vue'
import { loadTrendingToday } from '@/api/movie'
import { loadPopularPeople } from '@/api/people'

const movieList = ref<IMovie[] | null>(null)
const errorMovie = ref<string | null>(null)
const loadingMovie = ref(false)

const fetchTrendMovies = async () => {
  errorMovie.value = null
  movieList.value = null
  loadingMovie.value = true

  try {
    movieList.value = await loadTrendingToday()
  } catch (err: unknown) {
    if (err instanceof Error) {
      errorMovie.value =
        err.message.toString() + ' Возможно, у Вас выключен VPN.'
    }
  } finally {
    loadingMovie.value = false
  }
}

// =================
const people = ref<IPerson[] | null>(null)
const errorPeople = ref<string | null>(null)
const loadingPeople = ref(false)

const fetchPopularPeople = async () => {
  errorPeople.value = null
  people.value = null
  loadingPeople.value = true

  try {
    people.value = await loadPopularPeople()
  } catch (err: unknown) {
    if (err instanceof Error) {
      errorPeople.value =
        err.message.toString() + ' Возможно, у Вас выключен VPN.'
    }
  } finally {
    loadingPeople.value = false
  }
}

onMounted(() => {
  fetchTrendMovies()
  fetchPopularPeople()
})
</script>

<style scoped>
.base-layout-container {
  width: 950px;
  margin: 0 auto;
}

.films-view-header {
  box-sizing: border-box;
  margin: 0 auto;
  width: 950px;
  padding: 0.25rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.spinner-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 350px;
  width: 950px;
}
</style>
