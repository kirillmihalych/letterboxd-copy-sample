<template>
  <div
    @click="addMedia(props.movie.id, id)"
    class="movie-search-card-container"
  >
    <ImagePlaceholder
      :src="poster"
      :img-params="{ width: 32 + 'px', height: 48 + 'px' }"
      :title="props.movie.title"
    />
    <div class="movie-title-container">
      <h4>{{ props.movie.title }}({{ releaseYear }})</h4>
      <div>
        <v-icon icon="mdi-plus-box-outline" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import addMovie from '@/api/lists/addMovie'
import ImagePlaceholder from '../ImagePlaceholder.vue'
import type { IMovie } from '@/interfaces/movie-types'
import { computed, ref } from 'vue'
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

const releaseYear = computed(() => {
  return props.movie.release_date.slice(0, 4)
})
</script>

<style scoped>
h4 {
  font-size: 0.75rem;
}

.movie-search-card-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25rem;
  color: #222;
  overflow: hidden;
  background-color: var(--snow-white);
  border-radius: var(--radius);
}

.movie-search-card-container:hover {
  cursor: pointer;
  background-color: snow;
}

.movie-title-container {
  width: 85%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
