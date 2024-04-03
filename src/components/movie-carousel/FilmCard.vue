<template>
  <div class="film-card">
    <RouterLink :to="singleMovieURL">
      <ImagePlaceholder :src="poster" :title="movie.title">
        <img
          src="../../assets//images/black-back.jpg"
          alt="placeholder"
          class="placeholder"
        />
      </ImagePlaceholder>
    </RouterLink>
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
import type { IMovie } from '@/types'
import { RouterLink } from 'vue-router'
import ImagePlaceholder from '../ImagePlaceholder.vue'

interface FilmCardProps {
  movie: IMovie
}

const props = defineProps<FilmCardProps>()
const movie = ref<IMovie>(props.movie)

const poster = `https://image.tmdb.org/t/p/original/${movie.value.poster_path}`

const singleMovieURL = `/films/movie_page/${movie.value.id}`
</script>

<style scoped>
.placeholder {
  width: 185px;
}

img {
  width: 185px;
  display: block;
  object-position: center;
  object-fit: cover;
}
</style>
