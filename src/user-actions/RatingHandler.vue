<template>
  <div class="rating-handler-container">
    <div v-if="!isMovieReleased">This movie is not released yet.</div>
    <div v-if="isMovieReleased">
      <div class="add-rating-container">
        <button
          v-for="value in values"
          :key="value"
          @click="addRatingHandler(value)"
        >
          {{ value }}
        </button>
      </div>
      <div v-show="!rating">
        <p>{{ isLoading ? '...' : 'Not rated yet' }}</p>
      </div>
      <div class="my-rating-container" v-show="rating">
        <p>My rating is</p>
        <span class="my-rating">{{ isLoading ? '...' : rating }}</span>
        <button @click="deleteRatingHandler" class="delete-my-rating">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import addRating from '@/api/movies/addRating'
import deleteRating from '@/api/movies/deleteRating'
import getAccountState from '@/api/account/getAccountState'

interface IRatingHandlerProps {
  movie_id: number
  release: string
}

const props = defineProps<IRatingHandlerProps>()
const rating = ref<number | null>(null)
const isLoading = ref(false)

const releaseDate = new Date(props.release)
const currentDate = new Date()
const isMovieReleased = releaseDate <= currentDate

const getAccountStateHandler = async () => {
  try {
    rating.value = (await getAccountState(props.movie_id)).rated.value
  } catch (err) {
    if (err instanceof Error) {
      console.log('Error in getting an account state' + err.message.toString())
    }
  } finally {
    isLoading.value = false
  }
}

const addRatingHandler = async (value: number) => {
  try {
    rating.value = value
    await addRating(value, props.movie_id)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err)
    }
  }
}

const deleteRatingHandler = async () => {
  try {
    rating.value = null
    await deleteRating(props.movie_id)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message.toString())
    }
  }
}

const values = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

watchEffect(() => {
  getAccountStateHandler()
})
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
  color: snow;
}
</style>
