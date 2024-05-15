<template>
  <div class="multiselect">
    <div class="selectBox" @click="showGenres">
      <select>
        <option>Genre</option>
      </select>
      <div class="overSelect"></div>
    </div>
    <div
      class="checkboxes"
      v-show="isGenresShowed"
      @mouseleave="() => (isGenresShowed = false)"
    >
      <GenreCard
        v-for="genre in genreList"
        :key="genre.id"
        :genre="genre"
        @add-genre="(genre_id) => addSelectedGenre(genre_id)"
        @remove-genre="(genre_id) => removeSelectedGenre(genre_id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { loadGenreList } from '@/api/movie'
import type { IGenre } from '@/interfaces/movie-types'
import { onMounted, ref, watchEffect } from 'vue'
import GenreCard from './GenreCard.vue'
const emits = defineEmits<{
  (e: 'update-genres', payload: number[]): void
}>()

const genreList = ref<IGenre[] | null>(null)
const error = ref<string | null>(null)
const loading = ref(false)
const isGenresShowed = ref(false)

const selectedGenres = ref<number[]>([])
const addSelectedGenre = (genre_id: number) => {
  selectedGenres.value = [...selectedGenres.value, genre_id]
}
const removeSelectedGenre = (genre_id: number) => {
  selectedGenres.value = selectedGenres.value.filter((id) => id !== genre_id)
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

watchEffect(() => {
  emits('update-genres', selectedGenres.value)
})

const showGenres = (): void => {
  isGenresShowed.value = !isGenresShowed.value
}
</script>

<style scoped>
.multiselect {
  width: 75px;
}

.selectBox {
  position: relative;
}

.selectBox select {
  width: 100%;
  font-weight: bold;
}

.overSelect {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.checkboxes {
  position: absolute;
  background: #222;
  color: lightgray;
}

/* #checkboxes {
  display: none;
  border: 1px #dadada solid;
}

#checkboxes label {
  display: block;
}

#checkboxes label:hover {
  background-color: #1e90ff;
} */
</style>
