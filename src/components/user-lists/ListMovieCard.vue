<template>
  <div class="card-wrapper">
    <FilmCard :movie="props.movie" />
    <button @click="removeMovieHandler" class="remove-from-list-btn">
      remove
    </button>
  </div>
</template>

<script setup lang="ts">
import removieMovie from '@/api/lists/removeMovie'
import type { IMovie } from '@/interfaces/movie-types'
import { ref, type CSSProperties } from 'vue'
import { useRoute } from 'vue-router'
import ImagePlaceholder from '../ImagePlaceholder.vue'
import FilmCard from '../movie-cards/FilmCard.vue'

interface IListMovieCard {
  movie: IMovie
}

const props = defineProps<IListMovieCard>()
const route = useRoute()
const id = Number(route.params.id)
const isMovieRemoved = ref(false)

const emits = defineEmits<{
  (e: 'update-list-items'): void
}>()

const removeMovieHandler = async () => {
  try {
    isMovieRemoved.value = await removieMovie(props.movie.id, id)
  } catch (error) {
    console.log(error)
  } finally {
    if (isMovieRemoved.value) {
      emits('update-list-items')
    }
  }
}
</script>

<style scoped>
.remove-from-list-btn {
  border-radius: var(--radius);
  background: rgba(0, 0, 0, 15%);
  width: 185px;
  font-weight: 800;
  text-transform: capitalize;
  text-align: center;
}

.remove-from-list-btn:hover {
  cursor: pointer;
  background-color: red;
}
</style>
