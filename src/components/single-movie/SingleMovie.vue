<template>
  <!-- lists manipulations -->
  <section class="single-movie-container">
    <ImagePlaceholder
      :src="img_source"
      :title="movieDetails.title"
      :imgParams="imgParams"
    />
    <div>
      <h1>
        {{ movieDetails.title }}
        <span>({{ movieDetails.release_date?.slice(0, 4) }})</span>
      </h1>
      <p class="about-title">
        Directed by
        <span>
          <a href="/" v-for="director in mainDirectors" :key="director.id">
            {{ director.name }}
          </a>
        </span>
      </p>
      <p class="additional-main-info">
        Runtime: {{ runtime }}. More at <a :href="imdbLink">IMDb</a>
      </p>
      <p class="movie-overview">{{ movieDetails.overview }}</p>
      <hr />
      <FilmInfoList :movieInfo="movieDetails" />
    </div>
  </section>
</template>

<script setup lang="ts">
import ImagePlaceholder from '../ImagePlaceholder.vue'
import FilmInfoList from './movie-info/FilmInfoList.vue'
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
const img_source = `https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`
const imgParams = {
  width: 250 + 'px',
  height: 375 + 'px',
}

// ================================
// branestrom
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

.about-title {
  color: gray;
}

.about-item {
  color: grey;
}

.about-item span {
  color: #222;
}

.about-title a {
  text-decoration: none;
  color: #222;
  font-size: 1.2rem;
  padding: 0.1rem 0.2rem;
  border: 1px solid black;
  border-radius: 0.2rem;
}

.about-title a:hover {
  transition: all 0.1s;
  background: lightgrey;
}

.additional-main-info a {
  text-decoration: none;
  color: #222;
  border: 1px solid black;
  border-radius: 0.2rem;
  padding: 0.1rem 0.2rem;
}

.additional-main-info {
  color: gray;
}

.additional-main-info a:hover {
  transition: all 0.1s;
  background: lightgrey;
}
</style>
