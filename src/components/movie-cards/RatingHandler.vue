<template>
  <div v-if="!isMovieReleased">This movie is not released yet.</div>
  <div class="rating-handler-container" v-if="isMovieReleased">
    <div class="add-rating-container">
      <button
        v-for="value in values"
        :key="value"
        @click="addRatingHandler(value)"
      >
        {{ value }}
      </button>
    </div>
    <div v-show="!props.rating">
      <p>Not rated yet</p>
    </div>
    <div class="my-rating-container" v-show="props.rating">
      <p>My rating is</p>
      <span class="my-rating">{{
        isRatingLoading ? '...' : props.rating
      }}</span>
      <button @click="deleteRatingHandler" class="delete-my-rating">
        Delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import addRating from '@/api/movies/addRating'
import deleteRating from '@/api/movies/deleteRating'
// [x] получить дату релиза фильма
// [__] сранивать дату с текущей датой и на основе этого отображать или нет рейтинг
interface IRatingHandlerProps {
  rating: number | undefined
  movie_id: number
  release: string
}

const props = defineProps<IRatingHandlerProps>()
const emits = defineEmits<{
  (e: 'update', rating: number | undefined): void
}>()
const isRatingLoading = ref(false)

const releaseDate = new Date(props.release)
const currentDate = new Date()
const isMovieReleased = releaseDate <= currentDate

const addRatingHandler = async (value: number) => {
  isRatingLoading.value = true

  try {
    await addRating(value, props.movie_id)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err)
    }
  } finally {
    emits('update', value)
    isRatingLoading.value = false
  }
}

const deleteRatingHandler = async () => {
  isRatingLoading.value = true
  try {
    await deleteRating(props.movie_id)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message.toString())
    }
  } finally {
    emits('update', undefined)
    isRatingLoading.value = false
  }
}

const values = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
</script>

<style scoped>
.rating-handler-container {
  width: 216px;
  cursor: auto;
}

.add-rating-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.225rem;
}

.add-rating-container button {
  font-size: 0.675rem;
  padding: 5px 5px;
  border: none;
  cursor: pointer;
}

.add-rating-container button:hover {
  background: snow;
}

.my-rating-container {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 1rem;
}

.my-rating-container button {
  border: none;
  padding: 0.5rem;
}

.my-rating-container button:hover {
  cursor: pointer;
  background: snow;
}

.my-rating {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #651fff;
  height: 31px;
  width: 51px;
  /* padding: 0.4rem; */
  color: snow;
}
</style>
