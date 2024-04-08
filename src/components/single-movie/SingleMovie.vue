<template>
  <!-- lists manipulations -->
  <div class="single-movie-container">
    <div>
      <FilmCard :movie="movieDetails" />
    </div>
    <div>
      <header>
        <h1>
          {{ movieDetails.title }}
          <span>({{ movieDetails.release_date?.slice(0, 4) }})</span>
        </h1>
      </header>
      <article class="movie-directors">
        <h3>Режиссёры:</h3>
        <span>
          <a href="/" v-for="director in mainDirectors" :key="director.id">
            {{ director.name }}
          </a>
        </span>
      </article>
      <article class="movie-screenwriters">
        <h3>Сценаристы:</h3>
        <span>
          <a
            href="/"
            v-for="screenwriter in screenwriters"
            :key="screenwriter.id"
            >{{ screenwriter.name }}</a
          >
        </span>
      </article>

      <p class="movie-overview">{{ movieDetails.overview }}</p>
      <hr />
      <FilmInfoList :movieInfo="movieDetails" />
      <p>Продолжительность {{ runtime }}</p>
      <p>Узнать больше на <a :href="imdbLink">imdb</a></p>
    </div>
    <!-- cast info, rating, imdb links -->
  </div>
</template>

<script setup lang="ts">
import FilmInfoList from './movie-info/FilmInfoList.vue'
import FilmCard from '../movie-cards/FilmCard.vue'
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

// ================================
// branestrom
// 1) отключить ссылку в карте, используя кастомный компонент
// 2) сделать плеер и загружать трейлеры
// 3) добавить ссылку на год в названии, чтобы открывался список фильмов по годам
</script>

<style scoped>
.single-movie-container {
  padding: 1rem;
  width: 950px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 2fr;
}

.movie-directors {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.movie-directors a {
  text-decoration: none;
  margin-bottom: 0;
  font-size: 1.25rem;
  background: lightgrey;
  margin-right: 0.25rem;
  border-radius: 0.1rem;
  padding: 0.1rem 0.2rem;
}

.movie-directors a:hover {
  background: grey;
  transition: all 0.2s;
}

.movie-directors h3 {
  font-size: 1.25rem;
  margin-top: 0;
  margin-bottom: 0;
}

.movie-screenwriters {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.movie-screenwriters a {
  text-decoration: none;
  margin-bottom: 0;
  font-size: 1.25rem;
  background: lightgrey;
  margin-right: 0.25rem;
  border-radius: 0.1rem;
  padding: 0.1rem 0.2rem;
}

.movie-screenwriters a:hover {
  background: grey;
  transition: all 0.2s;
}

.movie-screenwriters h3 {
  font-size: 1.25rem;
  margin-top: 0;
  margin-bottom: 0;
}

.movie-overview {
  width: 450px;
}
</style>
