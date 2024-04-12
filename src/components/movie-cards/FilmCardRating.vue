<template>
  <div class="film-card-rating">
    <div>{{ rating.toFixed(1) }}</div>
    <div>{{ votes }}</div>
  </div>
</template>

<script setup lang="ts">
interface IFilmCardRatingProps {
  rating: number
  votes: number
}

const props = defineProps<IFilmCardRatingProps>()
const rating = props.rating
const votes = props.votes
</script>

<style scoped></style>
