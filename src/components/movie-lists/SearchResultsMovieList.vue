<template>
  <section>
    <MovieCardSearchResult
      v-for="movie in props.props"
      :key="movie.id"
      :movie="movie"
    />
  </section>
</template>

<script setup lang="ts">
import type { IMovieResult } from '@/types'
import MovieCardSearchResult from '../movie-cards/MovieCardSearchResult.vue'

interface ISearchResultMovieProps {
  props: IMovieResult[]
}

const props = defineProps<ISearchResultMovieProps>()
</script>

<style scoped></style>
