<template>
  <RouterLink :to="`/films/movie_page/${movie.id}`" class="movie-drop-card">
    {{ movie.title }} <span>({{ movie.release_date.slice(0, 4) }})</span>
  </RouterLink>
</template>

<script setup lang="ts">
import type { IMovie } from '@/types'
import { RouterLink } from 'vue-router'

interface IMovieDropCardProps {
  movie: IMovie
}

const props = defineProps<IMovieDropCardProps>()
const movie = props.movie
</script>

<style scoped>
.movie-drop-card {
  padding: 0.1rem 0;
  text-decoration: none;
  color: lightgrey;
  background: #222;
  width: 248px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.25rem;
}

.movie-drop-card:hover {
  background: black;
  transition: 0.1s;
}
</style>
