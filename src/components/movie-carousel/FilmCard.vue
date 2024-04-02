<template>
  <RouterLink :to="singleMovieURL" class="film-card">
    <ImagePlaceholder :src="poster" :title="movie.title">
      <img
        src="../../assets//images/black-back.jpg"
        alt="placeholder"
        class="placeholder"
      />
    </ImagePlaceholder>
    <div>
      <p>
        {{ movie.vote_count }} votes amount <br />
        with {{ movie.vote_average }} average
      </p>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { IMovie } from '@/types'
import { RouterLink } from 'vue-router'
import ImagePlaceholder from '../ImagePlaceholder.vue'

interface FilmCardProps {
  movie: IMovie
}

const props = defineProps<FilmCardProps>()
const movie = ref<IMovie>(props.movie)

// const poster = movie.value.poster_path
//   ? `https://image.tmdb.org/t/p/original/${movie.value.poster_path}`
//   : undefined
const poster = `https://image.tmdb.org/t/p/original/${movie.value.poster_path}`
// fix it later

const singleMovieURL = `/films/${movie.value.id}`
</script>

<style scoped>
.placeholder {
  width: 185px;
}

img {
  width: 200px;
  display: block;
  object-position: center;
  object-fit: cover;
}

.blur-load {
  background-size: cover;
  background-position: center;
}
</style>
