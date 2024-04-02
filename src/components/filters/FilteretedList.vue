<template>
  <section>
    <h3>Selected : {{ filtersStore.selectedGenres }}</h3>
    <span v-for="genre in genreList" :key="genre.id">
      <input
        type="checkbox"
        :id="genre.name"
        :value="genre.id"
        @change="genreChangeHandler"
      />
      <label :for="genre.name">
        {{ genre.name }}
      </label>
    </span>
  </section>
</template>

<script setup lang="ts">
import useFiltersStore from '@/stores/filters'
import { loadGenreList } from '@/api'
import type { IGenre } from '@/types'
import { computed, onMounted, ref } from 'vue'

const filtersStore = useFiltersStore()
// const selectedGenres = ref<IGenre[] | null>([])
const genreList = ref<IGenre[] | null>(null)
const error = ref<string | null>(null)
const loading = ref(false)

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

const genreChangeHandler = (e: Event) => {
  const inputValue = e.target as HTMLInputElement
  const inputValueChecked = inputValue.checked
  const genreID = Number(inputValue.value)
  if (inputValueChecked) {
    filtersStore.selectedGenres.set(genreID, inputValue.id)
  }

  if (!inputValueChecked && filtersStore.selectedGenres.has(genreID)) {
    filtersStore.selectedGenres.delete(genreID)
  }
}
</script>

<style scoped></style>
