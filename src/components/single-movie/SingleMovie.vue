<template>
  <!-- lists manipulations -->
  <div>
    <!-- movie card will be reused -->
    <FilmCard :movie="movieDetails" />
  </div>
  <div>
    <!-- addition info -->
    <h3>
      {{ movieDetails.title }}
      <!-- добавить ссылку, чтобы открывались фильмы по годам -->
      <span> {{ movieDetails.release_date?.slice(0, 4) }}</span>
      <p>от режиссёра <span>добавить режика</span></p>
      <!-- -->
    </h3>
    <article>
      <p>{{ movieDetails.overview }}</p>
    </article>
  </div>
  <!-- cast info, rating, imdb links -->
  <div>
    <FilmInfoList :movieInfo="movieDetails" />
  </div>
</template>

<script setup lang="ts">
import FilmInfoList from './movie-info/FilmInfoList.vue'
import { ref } from 'vue'
import FilmCard from '../movie-carousel/FilmCard.vue'
import type { IMovie, ICrewMember } from '@/types'

interface MovieDetailsProps {
  movieDetails: IMovie
}

const props = defineProps<MovieDetailsProps>()
const movieDetails = ref<IMovie>(props.movieDetails)
const crew = movieDetails.value.credits?.crew
</script>

<style scoped></style>
