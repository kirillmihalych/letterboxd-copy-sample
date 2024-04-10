<template>
  <section>
    <h3>tv shows results coming soon</h3>
    <article v-for="tvshow in props.props">
      {{ tvshow.media_type }}
    </article>
  </section>
  <div></div>
</template>

<script setup lang="ts">
import type { ITVShow } from '@/interfaces/movie-types'

interface ISearchRsultsTvListProps {
  props: ITVShow[]
}

const props = defineProps<ISearchRsultsTvListProps>()
</script>

<style scoped></style>
