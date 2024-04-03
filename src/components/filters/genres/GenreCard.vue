<template>
  <!-- <option :value="genre.id">{{ genre.name }}</option> -->
  <div>
    <label :for="genre.name">{{ genre.name }}</label>
    <input
      type="checkbox"
      :id="genre.name"
      :value="genre.id"
      v-model="filterStore.selectedOptions.genres"
    />
  </div>
</template>

<script setup lang="ts">
import type { IGenre } from '@/types'
import useFiltersStore from '@/stores/filters'

const filterStore = useFiltersStore()

interface IGenreCardProps {
  genre: IGenre
}

// const addGenre = (genre: any) => {
//   if (filterStore.selectedOptions.genres.length > 0) {
//     filterStore.selectedOptions.genres += `%2C${genre}`
//   } else {
//     filterStore.selectedOptions.genres += `${genre}`
//   }
// }

const onChangeGenres = (e: Event) => {
  // const event = e.target as HTMLInputElement
  // if (event.checked) {
  //   addGenre(event.value)
  // }

  console.log((e.target as HTMLInputElement).checked)
}

const props = defineProps<IGenreCardProps>()
const genre = props.genre
</script>

<style scoped></style>
