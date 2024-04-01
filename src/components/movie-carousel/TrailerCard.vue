<template>
  <div>{{ videoKey }}</div>
  <iframe width="500" height="500" :src="trailerURL" frameborder=""></iframe>
</template>

<script setup lang="ts">
interface ITrailerCard {
  videoKey: string
}

const props = defineProps<ITrailerCard>()
const key = props.videoKey

const youtubeBaseURL = 'https://www.youtube.com/embed/'
const trailerURL = youtubeBaseURL + key
</script>

<style scoped></style>
