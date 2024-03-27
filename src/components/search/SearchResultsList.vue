<template>
  <section v-if="props.movies === null">
    Ни один фильм по запросу не найден
  </section>
  <section v-if="props.movies">
    <SearchResultCard
      v-for="movie in props.movies"
      :key="movie.id"
      :movie="movie"
    />
  </section>
</template>

<script setup lang="ts">
import type { IMovie } from '@/types'
import SearchResultCard from './SearchResultCard.vue'

interface ISearchResultsList {
  movies: IMovie[] | null
}

const props = defineProps<ISearchResultsList>()
</script>

<style scoped></style>
