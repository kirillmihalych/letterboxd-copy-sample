<template>
  <div>
    <div v-if="movieList" class="movie-list" id="slider">
      <button class="btn-left" @click="slideLeft"><=</button>
      <FilmCard
        v-for="movie in movieList"
        :key="movie.id"
        :movie="movie"
        class="slide"
      />
      <button @click="slideRight" class="btn-right">=></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import FilmCard from './FilmCard.vue'
import type { IMovie } from '@/types'

interface IMovieTrendList {
  movieList: IMovie[] | null
}

const props = defineProps<IMovieTrendList>()
const movieList = props.movieList

function slideRight() {
  ;(document.getElementById('slider') as HTMLElement).scrollLeft += 925
}

function slideLeft() {
  ;(document.getElementById('slider') as HTMLElement).scrollLeft -= 925
}
</script>

<style scoped>
.movie-list {
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 1s linear;
  overflow: hidden;
  scroll-behavior: smooth;
}

.btn-right {
  right: 5px;
  position: absolute;
}

.btn-left {
  left: 5px;
  position: absolute;
}
</style>
