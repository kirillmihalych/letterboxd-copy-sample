<template>
  <div>
    <h2 class="movies-total">
      There are {{ filterStore.amountOfMovies }} films
    </h2>
    <div v-if="filterStore.loading">Loading...</div>
    <div v-if="filterStore.error">{{ filterStore.error }}</div>
    <section class="movie-list">
      <FilmCard
        v-for="movie in filterStore.discoveredMovieList"
        :key="movie.id"
        :movie="movie"
      />
      <!-- <MovieImgCard
        v-for="movie in filterStore.discoveredMovieList"
        :key="movie.id"
        :movie="movie"
      /> -->
    </section>
  </div>
</template>

<script setup lang="ts">
import useFiltersStore from '@/stores/filters'
import MovieImgCard from '../movie-cards/MovieImgCard.vue'
import FilmCard from '../movie-cards/FilmCard.vue'

const filterStore = useFiltersStore()
</script>

<style scoped>
.movies-total {
  width: 950px;
  text-align: center;
  background: grey;
  color: lightgray;
  font-size: 15px;
  border-radius: 0.25rem;
}

.movie-list {
  width: 950px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.25rem;
  justify-items: center;
  align-items: center;
}
</style>
