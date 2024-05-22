<template>
  <div>
    {{ props.movie.title }}
    <button @click="removeMovieHandler">remove</button>
  </div>
</template>

<script setup lang="ts">
import removieMovie from '@/api/lists/removeMovie'
import type { IMovie } from '@/interfaces/movie-types'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

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

<style scoped></style>
