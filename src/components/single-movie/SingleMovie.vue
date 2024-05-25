<template>
  <section>
    <h2 class="h3">
      {{ movie.title }}
      <span>({{ movie.release_date?.slice(0, 4) }})</span>
    </h2>
    <dl>
      <dt>Directed by</dt>
      <dd v-for="director in mainDirectors" :key="director.id">
        <a href="/">
          {{ director.name }}
        </a>
      </dd>
      <dt>Runtime:</dt>
      <dd>{{ runtime }}</dd>
    </dl>
    <p>{{ movie.overview }}</p>
    <p>More at <a :href="imdbLink">IMDb</a></p>
    <FilmInfoList :movieInfo="movie" />
  </section>
</template>

<script setup lang="ts">
import FilmInfoList from './movie-info/FilmInfoList.vue'
import type { ICrewMember, IMovie } from '@/interfaces/movie-types'

interface movieProps {
  movie: IMovie
}

const props = defineProps<movieProps>()
const movie = props.movie
const crew = movie.credits?.crew
const mainDirectors: ICrewMember[] = crew.filter(
  (crewMember: ICrewMember) => crewMember.job === 'Director'
)
// const screenwriters: ICrewMember[] = crew.filter(
//   (crewMember: ICrewMember) => crewMember.job === 'Screenplay'
// )
const imdbLink = `https://www.imdb.com/title/${movie.imdb_id}`
const runtime = movie.runtime
</script>

<style scoped></style>
