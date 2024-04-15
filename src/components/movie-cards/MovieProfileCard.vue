<template>
  <div class="profile-movie-card-container">
    <div class="img-container">
      <div v-if="!isImgReady" class="spinner-container">
        <SpinnerComp />
      </div>
      <img
        v-show="isImgReady"
        :src="imgUrl"
        :alt="movieTitle"
        class="poster-movie"
        @load="isImgReady = true"
      />
    </div>
    <div class="movie-info">
      <div class="rating-title-date-container">
        <div class="title-date">
          <h2>{{ movieTitle }}</h2>
          <h3>{{ movieReleaseDate }}</h3>
        </div>
        <div class="title-date">
          <h2>{{ movieTmdbRating }}</h2>
          <h3>{{ movieVoteCounts }}</h3>
        </div>
      </div>
      <p class="movie-overview">{{ movieOverview }}</p>
      <div class="actions-with-movie-container">
        <h4>
          Your rating is <span>{{ movieMyRating }}</span>
        </h4>
        <div>favorite</div>
        <div>add-to-list</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IRatedMovie } from '@/interfaces/user-types'
import SpinnerComp from '../error-handling/SpinnerComp.vue'
import { ref } from 'vue'

interface IMovieProfileCardProps {
  movie: IRatedMovie
}

const props = defineProps<IMovieProfileCardProps>()
const movie = props.movie

const isImgReady = ref(false)
const imgUrl = `https://image.tmdb.org/t/p/original/${movie.poster_path}`
const movieTitle = movie.title
const movieTmdbRating = movie.vote_average.toFixed(2)
const movieVoteCounts = movie.vote_count
const movieMyRating = movie.rating
const movieReleaseDate = movie.release_date
const movieOverview = movie.overview
// ==================================
// поставить рейтинг
// добавить в фавориты (тагл)
// добавить в мои листы
</script>

<style scoped>
.profile-movie-card-container {
  box-sizing: border-box;
  width: 950px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 4fr;
  height: 300px;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.spinner-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
}

.img-container img {
  width: 199px;
  object-fit: cover;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
}

.rating-title-date-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-left: 1rem;
  margin-right: 3rem;
  margin-top: 1rem;
}

.title-date h2 {
  margin: 0;
}

.title-date h3 {
  margin: 0;
  color: darkgrey;
}

.tmdb-rating {
  /* display: flex;
  align-items: center;
  justify-content: center; */
  /* border: 2px solid black; */
  border-radius: 0.2rem;
  background: lightgrey;
  width: 50px;
  height: 50px;
  font-weight: bold;
  font-size: 1.5rem;
}

.movie-overview {
  margin: 1rem;
}

.actions-with-movie-container {
  display: grid;
  margin: 1rem;
}

.movie-my-rating {
  /* background: green; */
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background: lightgrey;
  width: 45px;
  height: 45px;
  font-weight: bold;
  font-size: 1.5rem;
  border-radius: 50%;
}

.your-rating-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
