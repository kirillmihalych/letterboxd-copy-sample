<template>
  <div>
    <FilterList />
    <MovieImgCard v-for="movie in movieList" :key="movie.id" :movie="movie" />
  </div>
</template>

<script setup lang="ts">
import FilterList from './FilterList.vue'
import type { IMovie } from '@/types'
import MovieImgCard from './MovieImgCard.vue'
import { computed, watchEffect } from 'vue'
import useFiltersStore from '@/stores/filters'

const filtersStore = useFiltersStore()

interface IPopularMovieListProps {
  movieList: IMovie[]
}

const props = defineProps<IPopularMovieListProps>()
const movieList = props.movieList

// const filteredPopularList = computed(() => {
//   return movieList.filter((movie) =>
//     movie.genre_ids.some((id) => filtersStore.selectedGenres.has(Number(id)))
//   )
// })

// console.log(
//   movieList.filter((movie) =>
//     movie.genre_ids.reduce((acc, id) => acc + id, '').includes('16' + '12')
//   )
// )

// console.log('16' + '99')

// из каждого загруженного листа фильмов
// должен вести пусть на страницу фильтрованных фильмов
// куда будут передаваться лист фильмов нефильтр
// и параметры в виде выбранных жанров
//
// фильтры не добавляются
</script>

<style scoped></style>
