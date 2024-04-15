<template>
  <div class="list-page-card-container">
    <div class="movie-title">
      <RouterLink :to="`/films/movie_page/${movie.id}`">
        <h1>{{ movie.title }}</h1>
      </RouterLink>
      <div class="btn-container">
        <RemoveFromListBtn :list_id="$props.list_id" :movie_id="movie.id" />
        <button>favorite</button>
        <button>watchlist</button>
      </div>
    </div>

    <div class="movie-rating">
      <h2>{{ movie.vote_average.toFixed(2) }}</h2>
      <p>{{ movie.vote_count }}</p>
    </div>
    <img :src="poster" :alt="movie.title" class="movie-poster" />
  </div>
</template>

<script setup lang="ts">
import type { IMovie } from '@/interfaces/movie-types'
import { RouterLink } from 'vue-router'
import RemoveFromListBtn from './RemoveFromListBtn.vue'

interface IListPageCardProps {
  movie: IMovie
  list_id: number
}

const props = defineProps<IListPageCardProps>()
const movie = props.movie

const poster = `https://image.tmdb.org/t/p/original/${movie.poster_path}`
</script>

<style scoped>
.list-page-card-container {
  margin-top: 1rem;
  height: 125px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  place-items: center;
  background: lightslategray;
  border-radius: 0.25rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.movie-title a {
  text-decoration: none;
  color: #222;
  font-size: 1rem;
  /* padding:; */
}

.movie-title a:hover {
  cursor: pointer;
  color: snow;
}

.movie-rating {
  display: grid;
}

.movie-rating h2 {
  color: #222;
  font-weight: bold;
  margin-bottom: 0;
}

.movie-rating p {
  font-weight: 400;
  color: lightgray;
}

.movie-poster {
  width: 400px;
  height: 125px;
  object-fit: cover;
}

.btn-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
