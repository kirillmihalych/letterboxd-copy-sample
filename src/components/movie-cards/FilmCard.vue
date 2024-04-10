<template>
  <div class="film-card">
    <RouterLink :to="singleMovieURL">
      <ImagePlaceholder
        :src="poster"
        :title="movie.title"
        :imgParams="cssParams"
      />
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ref, type CSSProperties } from 'vue'
import type { IMovie } from '@/interfaces/movie-types'
import { RouterLink } from 'vue-router'
import ImagePlaceholder from '../ImagePlaceholder.vue'

interface FilmCardProps {
  movie: IMovie
}

const props = defineProps<FilmCardProps>()
const movie = ref<IMovie>(props.movie)

const cssParams: CSSProperties = {
  width: 235 + 'px',
  height: 351 + 'px',
}

const poster = `https://image.tmdb.org/t/p/original/${movie.value.poster_path}`
const singleMovieURL = `/films/movie_page/${movie.value.id}`
</script>

<style scoped>
.img-card {
  box-sizing: border-box;
}
</style>
