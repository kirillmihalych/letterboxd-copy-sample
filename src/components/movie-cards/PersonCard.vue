<template>
  <div>{{ props.person.name }}</div>
</template>

<script setup lang="ts">
import type { IPerson } from '@/interfaces/movie-types'

interface IPersonCardInterface {
  person: IPerson
}

const props = defineProps<IPersonCardInterface>()
</script>

<style scoped></style>
