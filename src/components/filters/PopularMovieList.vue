<template>
  <header>
    <div class="title-container">
      <h2>Popular movies</h2>
      <span class="filters-container">
        <GenreList />
        <VotesAmountInput />
        <button @click="clearFilterOptions">clear filters</button>
      </span>
    </div>
    <p class="list-overview">
      This rating based on metrics like number of votes for the day, number of
      views for the day, number of users who marked it as a "favourite" for the
      day, number of users who added it to their "watchlist" for the day,
      release date, number of total votes and previous days score.
    </p>
    <hr />
  </header>
  <div class="popular-movies-container">
    <MovieImgCard
      v-for="movie in movieList"
      :key="movie.id"
      :movie="movie"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script setup lang="ts">
import type { IMovie } from '@/types'
import MovieImgCard from '../movie-cards/MovieImgCard.vue'
import { ref } from 'vue'
import GenreList from './genres/GenreList.vue'
import VotesAmountInput from './rating/VotesAmountInput.vue'
import useFiltersStore from '@/stores/filters'

interface IPopularMovieListProps {
  movieList: IMovie[]
}

const filterStore = useFiltersStore()
const props = defineProps<IPopularMovieListProps>()
const movieList = props.movieList

const width = ref(275 + 'px')
const height = ref(385 + 'px')

const clearFilterOptions = () => {
  filterStore.selectedOptions.genres = []
  filterStore.selectedOptions.sort_by = ''
}
</script>

<style scoped>
.popular-movies-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
  gap: 1rem;
}

.list-overview {
  width: 950px;
}

.title-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.filters-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
