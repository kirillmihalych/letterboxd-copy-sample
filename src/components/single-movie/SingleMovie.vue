<template>
  <!-- lists manipulations -->
  <div>
    <FilmCard :movie="movieDetails" />
  </div>
  <div>
    <h1>
      {{ movieDetails.title }}
      <!-- добавить ссылку, чтобы открывались фильмы по годам -->
      <span>{{ movieDetails.release_date?.slice(0, 4) }}</span>
    </h1>
    <h2>От режессёров</h2>
    <ul>
      <li v-for="director in mainDirectors" :key="director.id">
        {{ director.name }}
      </li>
    </ul>
    <h2>Cценарий</h2>
    <ul>
      <li v-for="screenwriter in screenwriters" :key="screenwriter.id">
        {{ screenwriter.name }}
      </li>
    </ul>
    <!-- добавить ссылку на страницу режессёра -->

    <p>{{ movieDetails.overview }}</p>
  </div>
  <!-- cast info, rating, imdb links -->
  <FilmInfoList :movieInfo="movieDetails" />
  <p>Продолжительность {{ runtime }}</p>
  <p>Узнать больше на <a :href="imdbLink">imdb</a></p>
</template>

<script setup lang="ts">
import FilmInfoList from './movie-info/FilmInfoList.vue'
import FilmCard from '../movie-carousel/FilmCard.vue'
import type { ICrewMember, IMovie } from '@/types'

interface MovieDetailsProps {
  movieDetails: IMovie
}

const props = defineProps<MovieDetailsProps>()
const movieDetails = props.movieDetails
const crew = movieDetails.credits?.crew
const mainDirectors: ICrewMember[] = crew.filter(
  (crewMember: ICrewMember) => crewMember.job === 'Director'
)
const screenwriters: ICrewMember[] = crew.filter(
  (crewMember: ICrewMember) => crewMember.job === 'Screenplay'
)
const imdbLink = `https://www.imdb.com/title/${movieDetails.imdb_id}`
const runtime = movieDetails.runtime
</script>

<style scoped></style>
