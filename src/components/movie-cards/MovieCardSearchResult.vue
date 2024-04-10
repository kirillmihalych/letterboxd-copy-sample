<template>
  <div class="movie-card-container">
    <article class="movie-card">
      <RouterLink :to="singleMovieURL">
        <ImagePlaceholder
          :src="img_src"
          :title="title"
          :imgParams="img_params"
        />
      </RouterLink>
      <div class="movie-info-container">
        <h3>{{ title }}({{ year }})</h3>
        <p class="overview">{{ overview }}</p>
      </div>
      <div>
        <h4>rating: {{ rating }}</h4>
        <h4>votes: {{ vote_amount }}</h4>
      </div>
    </article>
  </div>
  <hr />
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ImagePlaceholder from '../ImagePlaceholder.vue'
import type { IMovieResult } from '@/interfaces/movie-types'

interface IMovieCardSearchResultProps {
  movie: IMovieResult
}

const props = defineProps<IMovieCardSearchResultProps>()
const movie = props.movie
const title = movie.title
const year = movie.release_date.slice(0, 4)
const overview = movie.overview.slice(0, 150) + '...'
const rating = movie.vote_average
const vote_amount = movie.vote_count
const img_src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`
const img_params = {
  width: 75 + 'px',
  height: 110 + 'px',
}
const singleMovieURL = `/films/movie_page/${movie.id}`
</script>

<style scoped>
.movie-card-container:hover {
  background: lightgray;
  transition: all 0.1s;
  border-radius: 0.25rem;
}

.movie-card {
  width: 700px;
  box-sizing: border-box;
  padding: 0.25rem;
  display: grid;
  grid-template-columns: 1fr 4fr 2fr;
  margin-bottom: 1rem;
  place-items: center;
}

.movie-info-container {
  display: grid;
}
</style>
