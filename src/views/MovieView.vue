<template>
  <div v-if="isLoading">
    <SpinnerComp />
  </div>

  <div v-if="error">{{ error }}</div>

  <article v-if="movie">
    <ImagePlaceholder
      :src="poster"
      :title="movie.title"
      :imgParams="imgParams"
    />
    <SingleMovie :movie="movie" />
    <UserActionsMenu
      :movie_id="movie.id"
      :release="movie.release_date"
      :vote_average="movie.vote_average"
      :vote_count="movie.vote_count"
    />
  </article>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import getMovie from '@/api/movies/getMovie'
import { useRoute } from 'vue-router'
import SingleMovie from '@/components/single-movie/SingleMovie.vue'
import ImagePlaceholder from '@/components/ImagePlaceholder.vue'
import UserActionsMenu from '@/user-actions/UserActionsMenu.vue'
import SpinnerComp from '@/components/error-handling/SpinnerComp.vue'
import type { IMovie } from '@/interfaces/movie-types'
const movie = ref<IMovie | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)
const route = useRoute()
const route_id = Number(route.params.id)
const poster = ref('')
const imgParams = {
  width: 250 + 'px',
  height: 375 + 'px',
}

const fetchMovieById = async () => {
  isLoading.value = true
  error.value = null
  movie.value = null
  try {
    movie.value = await getMovie(route_id)
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message.toString()
    }
  } finally {
    poster.value = `https://image.tmdb.org/t/p/w342/${movie.value?.poster_path}`
    isLoading.value = false
  }
}

watchEffect(() => {
  fetchMovieById()
})
</script>

<style scoped>
article {
  padding: 2rem 1rem;
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, auto);
}

@media (min-width: 1000px) {
  article {
    grid-template-columns: 1fr 2fr 1fr;
  }
  section {
    padding: 0rem 2rem;
  }
  .img-wrapper {
    text-align: center;
  }
}
</style>
