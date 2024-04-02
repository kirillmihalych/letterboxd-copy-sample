<template>
  <div>
    <FiltersList />
    <MovieImgCard v-for="movie in movies" :key="movie.id" :movie="movie" />
  </div>
</template>

<script setup lang="ts">
import FilteretedList from './FilteretedList.vue'
import type { IMovie } from '@/types'
import MovieImgCard from './MovieImgCard.vue'
import { computed, onMounted } from 'vue'

interface ITopRatedMovieList {
  movies: IMovie[] | null
}

const props = defineProps<ITopRatedMovieList>()
const movies = props.movies

// select инпут с опциями
// я выбираю жанры которые отображать
// передаются ids
// и отображаются фильмы
// только те, что эти id содержат
</script>

<style scoped></style>
