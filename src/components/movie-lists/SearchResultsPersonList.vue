<template>
  <section>
    <h3>Person search results list coming soon</h3>
    <article v-for="person in props.props">
      {{ person.media_type }}
    </article>
  </section>
</template>

<script setup lang="ts">
import type { IPerson } from '@/types'

interface ISearchResultPersonProps {
  props: IPerson[]
}

const props = defineProps<ISearchResultPersonProps>()
</script>

<style scoped></style>
