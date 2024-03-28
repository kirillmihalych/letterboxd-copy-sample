<template>
  <div>img card</div>
</template>

<script setup lang="ts">
import type { IMovie } from '@/types'

interface IMovieImgCardProps {
  movie: IMovie
}

const props = defineProps<IMovieImgCardProps>()
</script>

<style scoped></style>
