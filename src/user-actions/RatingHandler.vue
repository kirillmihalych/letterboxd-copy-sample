<template>
  <section class="rating-handler-container">
    <div v-if="isLoading">
      <SpinnerComp />
    </div>
    <div v-if="!isLoading">
      <div v-if="!isMovieReleased">This movie is not released yet.</div>
      <div v-if="isMovieReleased" class="content-wrapper">
        <h4 class="title">Rate this</h4>
        <div
          class="star-btns-container"
          @mouseenter="saveCurrRating"
          @mouseleave="resetCurrRating"
        >
          <button
            v-for="value in values"
            :key="value"
            @click="addRatingHandler(value)"
            @mouseenter="setCurrRating(value)"
          >
            <div class="star-value-container">
              <v-icon
                icon="mdi-star"
                class="hollow-star"
                :style="{ color: isCurrRatingGreater(value) }"
              />
              <span>{{ value }}</span>
            </div>
          </button>
        </div>
        <div v-show="!userRating" class="user-rating-container">
          <p>{{ isLoading ? '...' : 'Not rated yet' }}</p>
        </div>
        <div class="user-rating-container" v-show="userRating">
          <p>My rating is</p>
          <span
            class="user-rating"
            :style="{ backgroundColor: userRatingColor }"
            >{{ isLoading ? '...' : userRating }}</span
          >
          <button @click="deleteRatingHandler" class="delete-user-rating">
            Delete
          </button>
        </div>
        <div class="tmdb-rating-container">
          <p>TMDB rating is</p>
          <span
            class="tmdb-rating"
            :style="{ backgroundColor: tmdbRatingColor }"
          >
            {{ props.vote_average.toFixed(1) }}
          </span>
          <p>{{ vote_count }} votes</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import addRating from '@/api/movies/addRating'
import deleteRating from '@/api/movies/deleteRating'
import getAccountState from '@/api/account/getAccountState'
import SpinnerComp from '@/components/error-handling/SpinnerComp.vue'

//

interface IRatingHandlerProps {
  movie_id: number
  release: string
  vote_average: number
  vote_count: number
}
const props = defineProps<IRatingHandlerProps>()
const emits = defineEmits<{
  (e: 'update-is-rated', is_rated: boolean): void
}>()

const temp = ref<number | null>(null)
const userRating = ref<number | null>(null)
const setUserRating = () => (userRating.value = rating.value)

const saveCurrRating = () => (temp.value = rating.value)
const setCurrRating = (value: number) => (rating.value = value)
const resetCurrRating = () => (rating.value = temp.value)
const isCurrRatingGreater = (value: number) =>
  rating.value !== null && rating.value >= value ? 'orange' : 'lightgrey'

const rating = ref<number | null>(null)
const isLoading = ref(false)

const releaseDate = new Date(props.release)
const currentDate = new Date()
const isMovieReleased = releaseDate <= currentDate

const getAccountStateHandler = async () => {
  try {
    isLoading.value = true
    rating.value = (await getAccountState(props.movie_id)).rated.value
  } catch (err) {
    if (err instanceof Error) {
      console.log('Error in getting an account state' + err.message.toString())
    }
  } finally {
    setUserRating()
    isLoading.value = false
  }
}

const addRatingHandler = async (value: number) => {
  try {
    temp.value = value
    rating.value = value
    userRating.value = value
    await addRating(value, props.movie_id)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err)
    }
  } finally {
    emits('update-is-rated', true)
  }
}

const deleteRatingHandler = async () => {
  try {
    temp.value = null
    rating.value = null
    userRating.value = null
    await deleteRating(props.movie_id)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message.toString())
    }
  } finally {
    emits('update-is-rated', false)
  }
}

const userRatingColor = computed(() => {
  return userRating.value !== null && userRating.value < 5
    ? 'red'
    : userRating.value !== null && userRating.value < 7
    ? 'lightgray'
    : 'green'
})

const tmdbRatingColor = computed(() => {
  return props.vote_average < 5
    ? 'red'
    : props.vote_average < 7
    ? 'lightgray'
    : 'green'
})

const values = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

watchEffect(() => {
  getAccountStateHandler()
})
</script>

<style scoped>
.title {
  padding: 0rem 0.5rem;
  align-self: end;
}

.star-btns-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.star-btns-container button {
  padding: 0.25rem;
  cursor: pointer;
}

.star-value-container {
  width: 2rem;
  display: grid;
  place-items: center;
  gap: 0.25rem;
}

.star-value-container span {
  font-size: 0.75rem;
  color: var(--light-grey);
}

.tmdb-rating-container {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 1rem;
  padding: 0rem 0.5rem;
}

.tmdb-rating {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  color: var(--snow-white);
}

.user-rating-container {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 1rem;
  padding: 0 0.5rem;
}
.user-rating {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  color: var(--snow-white);
}

.content-wrapper {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 2fr 1fr 1fr;
  gap: 1.25rem;
}

.delete-user-rating {
  color: var(--light-grey);
  border-radius: var(--radius);
}

.delete-user-rating:hover {
  cursor: pointer;
  color: #222;
}
</style>
