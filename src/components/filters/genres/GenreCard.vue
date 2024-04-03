<template>
  <option :value="genre.id">{{ genre.name }}</option>
</template>

<script setup lang="ts">
import type { IGenre } from '@/types'

interface IGenreCardProps {
  genre: IGenre
}

const props = defineProps<IGenreCardProps>()
const genre = props.genre
</script>

<style scoped></style>
