<template>
  <RouterLink :to="movieURL" class="movie-search-card-container">
    <ImagePlaceholder
      :src="poster"
      :img-params="{ width: 32 + 'px', height: 48 + 'px' }"
      :title="props.movie.title"
    />
    <div class="movie-title-container">
      <h4>
        {{ props.movie.title }}({{ props.movie.release_date.slice(0, 4) }})
      </h4>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { IMovie } from '@/interfaces/movie-types'
import ImagePlaceholder from '../ImagePlaceholder.vue'
import { ROUTE_NAMES } from '@/router'

interface IMovieSearchCard {
  movie: IMovie
}

const props = defineProps<IMovieSearchCard>()
const poster = `https://image.tmdb.org/t/p/w92/${props.movie.poster_path}`
const movieURL = { name: ROUTE_NAMES.MOVIE, params: { id: props.movie.id } }
</script>

<style scoped>
h4 {
  font-size: 0.75rem;
}

.movie-search-card-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25rem;
  color: #222;
  overflow: hidden;
  background-color: var(--snow-white);
  border-radius: var(--radius);
}

.movie-search-card-container:hover {
  background-color: snow;
}

.movie-title-container {
  display: flex;
  align-items: center;
  justify-content: start;
}
</style>
