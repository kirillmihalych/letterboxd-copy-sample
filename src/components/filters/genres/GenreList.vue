<template>
  <!-- <label for="genres">genres</label> -->
  <!-- <select v-model="selectedGenres" name="genres">
    <h3>Genres</h3> -->
  <GenreCard
    v-for="genre in genreList"
    :key="genre.id"
    :genre="genre"
    @update-selected-genres="updateSelectedGenres"
  />
  <!-- </select> -->
</template>

<script setup lang="ts">
import { doDiscoverMovies, loadGenreList } from '@/api'
import type { IGenre } from '@/types'
import { onMounted, ref } from 'vue'
import GenreCard from './GenreCard.vue'
import useFiltersStore from '@/stores/filters'

const genreList = ref<IGenre[] | null>(null)
const error = ref<string | null>(null)
const loading = ref(false)
const selectedGenres = ref<string>('')

const updateSelectedGenres = async (genre: IGenre) => {
  if (selectedGenres.value.length > 0) {
    selectedGenres.value += `%2C${genre.id}`
  } else {
    selectedGenres.value += genre.id
  }

  // console.log(await doDiscoverMovies())
}

const fetchGenreList = async () => {
  genreList.value = null
  error.value = null
  try {
    loading.value = true
    genreList.value = await loadGenreList()
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value =
        err.message.toString() + ' ' + 'Возможно, у Вас отключен VPN.'
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchGenreList()
})

// interface IGenreListProps {
//   genre: IGenre
// }

// const props = defineProps<IGenreListProps>()
</script>

<style scoped></style>
