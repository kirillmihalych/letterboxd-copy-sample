<template>
  <div class="base-layout-container">
    <div v-if="errorMovie && errorPeople" class="vpn-warning">
      Что-то пошло не так... <br />
      Возможно, у Вас выключен VPN.<br />
      Попробуйте включить его и перезагрузите страницу <br />
    </div>
    <!-- movies start -->
    <div>
      <div class="fetch-handle-container" v-if="loadingMovie">
        <SpinnerComp />
      </div>
      <!-- <div v-if="errorMovie">{{ errorMovie }}</div> -->
      <div v-if="movieList">
        <CarouselComponent :items="movieList">
          <template #header>
            <h2 class="movies-carousel-title h3">Movies trending today</h2>
          </template>
          <template #item="slotProps">
            <FilmCard :movie="slotProps.item" />
          </template>
        </CarouselComponent>
      </div>
    </div>
    <!-- movies end -->
    <!-- people start -->
    <div>
      <div class="fetch-handle-container" v-if="loadingPeople">
        <SpinnerComp />
      </div>
      <!-- <div v-if="errorPeople">{{ errorPeople }}</div> -->
      <div v-if="people">
        <CarouselComponent :items="people">
          <template #header>
            <h2 class="movies-carousel-title h3">Popular people</h2>
          </template>
          <template #item="slotProps">
            <PersonCard :person="slotProps.item" />
          </template>
        </CarouselComponent>
      </div>
    </div>
    <!-- people end -->
  </div>
</template>

<script setup lang="ts">
import SpinnerComp from '@/components/error-handling/SpinnerComp.vue'
import CarouselComponent from '@/components/generic-carousel/CarouselComponent.vue'
import FilmCard from '@/components/movie-cards/FilmCard.vue'
import PersonCard from '@/components/person-card/PersonCard.vue'

import type { IMovie, IPerson } from '@/interfaces/movie-types'
import { onMounted, ref } from 'vue'
import getTrendingMovies from '@/api/movies/getTrendingMovies'
import getPopularPeople from '@/api/persons/getPopularPeople'

const movieList = ref<IMovie[] | null>(null)
const errorMovie = ref<string | null>(null)
const loadingMovie = ref(false)

const fetchTrendMovies = async () => {
  errorMovie.value = null
  movieList.value = null
  loadingMovie.value = true

  try {
    movieList.value = await getTrendingMovies()
  } catch (err: unknown) {
    if (err instanceof Error) {
      errorMovie.value =
        err.message.toString() + ' Возможно, у Вас выключен VPN.'
      console.log(errorMovie.value)
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
    people.value = await getPopularPeople()
  } catch (err: unknown) {
    if (err instanceof Error) {
      errorPeople.value =
        err.message.toString() + ' Возможно, у Вас выключен VPN.'
      console.log(errorPeople.value)
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
  /* min-width: 400px; */
  max-width: 950px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.films-view-header {
  box-sizing: border-box;
  /* margin: 0 auto;
  width: 950px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.movies-carousel-title {
  border-left: 0.25rem solid red;
  padding-left: 0.5rem;
}

.spinner-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 350px;
  /* width: 950px; */
}

.vpn-warning {
  text-align: center;
}
</style>
