<template>
  <div>
    <RouterLink :to="singleMovieURL">
      <ImagePlaceholder :src="poster" :title="movie.title">
        <img
          src="../../assets//images/black-back.jpg"
          alt="placeholder"
          class="placeholder"
        />
      </ImagePlaceholder>
      <!-- <img :src="poster" :alt="movie.title" class="card-img" /> -->

      <!-- on hover can see border (color green if i marked this film as watched, white if i met it first time) 
      can see 3 button on hover
      1) mark as watched (should be list there)
      2) mark as liked (should be list there)
      3) open modal menu like (rate this movie, show on imdb, add to lists)
      -->
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import type { IMovie } from '@/types'
import { RouterLink } from 'vue-router'
import ImagePlaceholder from '../ImagePlaceholder.vue'

interface IMovieImgCardProps {
  movie: IMovie
}

const props = defineProps<IMovieImgCardProps>()
const movie = props.movie

const poster = `https://image.tmdb.org/t/p/original/${movie.poster_path}`
const singleMovieURL = `/films/movie_page/${movie.id}`
</script>

<style scoped>
.card-img {
  object-fit: contain;
  height: 150px;
}

.placeholder {
  width: 180px;
}
</style>
