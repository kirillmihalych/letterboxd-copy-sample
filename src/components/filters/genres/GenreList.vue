<template>
  <!-- <label for="genres">genres</label> -->
  <select v-model="selectedFilters.genre" name="genres">
    <label>Genres</label>
    <GenreCard v-for="genre in genreList" :key="genre.id" :genre="genre" />
  </select>
</template>

<script setup lang="ts">
import { doDiscoverMovies, loadGenreList } from '@/api'
import type { IGenre } from '@/types'
import { onMounted, ref } from 'vue'
import GenreCard from './GenreCard.vue'
import useFiltersStore from '@/stores/filters'

const { selectedFilters } = useFiltersStore()
const genreList = ref<IGenre[] | null>(null)
const error = ref<string | null>(null)
const loading = ref(false)

const fetchGenreList = async () => {
  genreList.value = null
  error.value = null
  try {
    loading.value = true
    genreList.value = await loadGenreList()
    console.log(await doDiscoverMovies('popularity.asc'))
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
