<template>
  <button class="remove-btn" @click="removeMovieFromList">remove</button>
</template>

<script setup lang="ts">
import { postRemoveMovie } from '@/api/lists'
import { getSessionFromLocalStorage } from '@/local-storage/getSession'

interface IRemoveBtnProps {
  list_id: number
  movie_id: number
}

const session_id = getSessionFromLocalStorage()

const removeMovieFromList = async () => {
  try {
    const movie = {
      list_id: props.list_id,
      movie_id: props.movie_id,
      session_id: session_id,
    }
    await postRemoveMovie(movie)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message.toString())
    }
  } finally {
    location.reload()
  }
}

const props = defineProps<IRemoveBtnProps>()
</script>

<style scoped></style>
