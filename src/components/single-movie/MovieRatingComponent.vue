<template>
  <div>
    <h2>
      {{ userRating > 0 ? userRating : 'You did not rate this move yet' }}
    </h2>
    <input
      type="range"
      min="0"
      max="10"
      step="1"
      v-model="value"
      class="range-input"
    />
    <div class="sliderticks">
      <span>0</span>
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
      <span>5</span>
      <span>6</span>
      <span>7</span>
      <span>8</span>
      <span>9</span>
      <span>10</span>
    </div>
    <button @click="fetchAddRating">Rate this movie</button>
  </div>
</template>

<script setup lang="ts">
import { addRating, getAccountState } from '@/api/movie'
import { onMounted, ref } from 'vue'

interface IMovieRatingComponentProps {
  id: number
}

const props = defineProps<IMovieRatingComponentProps>()
const movie_id = props.id

const value = ref('0')
const error = ref<string | null>(null)
const userRating = ref(0)

const fetchAddRating = async () => {
  error.value = null
  try {
    await addRating(value.value, movie_id)
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message.toString()
    }
  }
}

const fetchMyRating = async () => {
  userRating.value = await getAccountState(movie_id)
}

onMounted(() => {
  fetchMyRating()
})
// 1) получаю Movie_id

// 2) передаю value в таком формате {"value": 9}
// 3) получаю succes
// 4) видимо нужно искать совпадению по id в истории рейтинга и брать мой реейтинг оттуда.
</script>

<style scoped>
.range-input {
  width: 250px;
  cursor: pointer;
}

.sliderticks {
  width: 240px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  margin-bottom: 1.5rem;
}

.sliderticks span {
  display: flex;
  justify-content: center;
  width: 1px;
  height: 10px;
  background: #d3d3d3;
  line-height: 40px;
}
</style>
