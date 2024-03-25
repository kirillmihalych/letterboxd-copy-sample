<template>
  <div class="film-card">
    <div><img :src="poster" :alt="movie.title" class="film-poster" /></div>
    <div>
      <p>
        {{ movie.vote_count }} votes amount <br />
        with {{ movie.vote_average }} average
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { IMovie } from '../types'

interface FilmCardProps {
  movie: IMovie
}

const props = defineProps<FilmCardProps>()
const movie = ref<IMovie>(props.movie)
const poster = `https://image.tmdb.org/t/p/original/${movie.value.backdrop_path}`
</script>

<style scoped>
/* .film-card {
  transform: rotate(90deg);
} */

.film-poster {
  width: 225px;
  object-fit: cover;
}
</style>
