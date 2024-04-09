<template>
  <section>
    <h3>search results movie list</h3>
    <article v-for="movie in props.props" :key="movie.id">
      {{ movie.title }}
    </article>
  </section>
</template>

<script setup lang="ts">
import type { IMovieResult } from '@/types'

interface ISearchResultMovieProps {
  props: IMovieResult[]
}

const props = defineProps<ISearchResultMovieProps>()
</script>

<style scoped></style>
