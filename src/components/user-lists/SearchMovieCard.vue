<template>
  <div class="media-card-container">
    <div
      class="content-container"
      @click="addMedia(props.movie.id, list?.id as number)"
    >
      <img :src="poster" alt="poster" class="poster" />
      <div class="media-info">
        <h1>
          {{ props.movie.title }}
        </h1>
        <div class="additional-info">
          <p>{{ props.movie.vote_average.toFixed(2) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import addMovie from '@/api/lists/addMovie'
import type { IMovie, ITVShow } from '@/interfaces/movie-types'
import { inject } from 'vue'
import { RouterLink } from 'vue-router'
import { listKey } from './provideInjectKeys'

const list = inject(listKey)

interface IMediaCard {
  movie: IMovie
}

const props = defineProps<IMediaCard>()
const poster = `https://image.tmdb.org/t/p/original/${props.movie.poster_path}`

const addMedia = async (movie_id: number, list_id: number) => {
  await addMovie(movie_id, list_id)
}
</script>

<style scoped>
.media-card-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75px;
  margin: 1rem 0rem;
}

.poster {
  object-fit: contain;
  width: 50px;
  height: 75px;
}

.content-container {
  width: 400px;
  text-decoration: none;
  color: #222;
  background: lightgray;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 1rem;
  padding: 5px;
}

.content-container:hover {
  background: #ac94f4;
  cursor: pointer;
}

.additional-info {
  display: flex;
  gap: 0.5rem;
}
</style>
