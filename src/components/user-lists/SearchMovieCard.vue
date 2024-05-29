<template>
  <div class="media-card-container" @click="addMedia(props.movie.id, id)">
    <div class="content-container">
      <img :src="poster" alt="poster" class="poster" />
      <div class="media-info">
        <h2>
          {{ props.movie.title }}
        </h2>
        <div class="additional-info">
          <p>{{ props.movie.vote_average.toFixed(2) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import addMovie from '@/api/lists/addMovie'
import type { IMovie } from '@/interfaces/movie-types'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

interface IMediaCard {
  movie: IMovie
}

const emits = defineEmits<{
  (e: 'update-list-items'): void
}>()

const route = useRoute()
const id = Number(route.params.id)
const props = defineProps<IMediaCard>()
const poster = `https://image.tmdb.org/t/p/original/${props.movie.poster_path}`

const isMovieAdded = ref(false)

const addMedia = async (movie_id: number, list_id: number) => {
  try {
    isMovieAdded.value = (await addMovie(movie_id, list_id)).success
  } catch (error) {
    console.log(error)
  } finally {
    if (isMovieAdded.value) {
      emits('update-list-items')
    }
  }
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