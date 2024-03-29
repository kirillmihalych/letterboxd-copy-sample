<template>
  <div class="movie-card">
    <div>
      <RouterLink :to="singleMovieURL"
        ><img :src="poster" :alt="props.movie.title" class="film-poster" />
      </RouterLink>
    </div>
    <div>
      <RouterLink :to="singleMovieURL">
        <h3>{{ props.movie.title }}</h3>
      </RouterLink>
      <h4>{{ props.movie.release_date }}</h4>
      <p>{{ props.movie.overview }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { IMovie } from '@/types'

interface ISearchResultCard {
  movie: IMovie
}

const props = defineProps<ISearchResultCard>()
const poster = props.movie.backdrop_path
  ? `https://image.tmdb.org/t/p/original/${props.movie.backdrop_path}`
  : undefined
const singleMovieURL = `/films/${props.movie.id}`
</script>

<style scoped>
.film-poster {
  /* width: 650px; */
  height: 150px;
  object-fit: contain;
}

.movie-card {
  border: 2px solid black;
  margin-bottom: 5px;
}
</style>
