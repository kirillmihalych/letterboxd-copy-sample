<template>
  <header>
    <GenreList />
    <!-- <button @click="searchByFilters = true" :disabled="disableSearch">
      искать по выбранным фильтрам
    </button> -->
  </header>
  <div class="movie-list-top-rated">
    <MovieImgCard
      v-for="movie in filteredMovieList"
      :key="movie.id"
      :movie="movie"
    />
  </div>
</template>

<script setup lang="ts">
import type { IMovie } from '@/types'
import MovieImgCard from './MovieImgCard.vue'
import GenreList from './genres/GenreList.vue'
import { computed, ref, watchEffect } from 'vue'
import useFiltersStore from '@/stores/filters'
import { watch } from 'fs'

interface ITopRatedMovieList {
  movies: IMovie[] | null
}

const store = useFiltersStore()
const props = defineProps<ITopRatedMovieList>()
const movies = props.movies

watchEffect(() => {
  console.log(store.selectedFilters.genre)
})

const filteredMovieList = computed(() => {
  return movies?.filter((movie) =>
    movie.genre_ids.some((id) => id === store.selectedFilters.genre)
  )
})
</script>

<style scoped>
.movie-list-top-rated {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  justify-content: center;
  align-items: center;
}
</style>
