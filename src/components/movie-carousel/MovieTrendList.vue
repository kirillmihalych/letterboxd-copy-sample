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

// const posters = movieList?.map(
//   (movie) => `https://image.tmdb.org/t/p/original/${movie.poster_path}`
// )
// const loadedPosters = ref<PromiseSettledResult<unknown>[]>()
// const preloadPosters = async (posters: string[]) => {
//   const load = posters.map(async (posterPath) => {
//     const img = new Image()
//     img.src = posterPath
//     return await new Promise((res) => {
//       img.onload = () => res(img)
//     })
//   })

//   loadedPosters.value = await Promise.allSettled(load)
// }

// onMounted(() => {
//   preloadPosters(posters as string[])
// })

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
