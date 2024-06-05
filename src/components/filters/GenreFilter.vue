<template>
  <FilterWrapper :isClosed="isClosed">
    <template #filter-heading>Genres</template>
    <template #filter-name>Genres</template>
    <template #filter-options>
      <div
        v-for="genre in genres"
        :key="genre.id"
        class="genre"
        @click="selectGenreHandler(genre.id)"
      >
        <p>{{ genre.name }}</p>
        <v-icon
          v-if="!isGenreSelected(genre.id)"
          icon="mdi-checkbox-blank-outline"
        />
        <v-icon
          v-else="isGenreSelected(genre.id)"
          icon="mdi-checkbox-intermediate"
        />
      </div>
    </template>
  </FilterWrapper>
</template>

<script setup lang="ts">
import getGenres from '@/api/movies/getGenres'
import type { IGenre } from '@/interfaces/movie-types'
import { onMounted, ref } from 'vue'
import { useFilterStore } from '@/stores/filters'
import FilterWrapper from './FilterWrapper.vue'

const store = useFilterStore()
const genres = ref<IGenre[] | null>(null)
const isGenresLoading = ref(false)
const error = ref<string | null>(null)

const fetchGenres = async () => {
  genres.value = null
  error.value = null
  try {
    isGenresLoading.value = true
    genres.value = await getGenres()
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message.toString()
      console.log(error.value)
    }
  } finally {
    isGenresLoading.value = false
  }
}

onMounted(() => {
  fetchGenres()
})

const isClosed = ref(false)

const isGenreSelected = (genre: number) => {
  return store.genres.join(',').includes(String(genre))
}

const selectGenreHandler = (genre: number) => {
  store.genres.push(genre)
  isClosed.value = !isClosed.value
}
</script>

<style scoped>
.genre {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.genre:hover {
  color: var(--light-grey);
}
</style>
