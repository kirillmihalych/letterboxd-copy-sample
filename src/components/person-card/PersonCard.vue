<template>
  <div class="wrapper">
    <RouterLink :to="personURL">
      <ImagePlaceholder
        :src="profile_picture"
        :imgParams="params"
        :title="props.person.name"
      />
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import type { IPerson } from '@/interfaces/movie-types'
import ImagePlaceholder from '../ImagePlaceholder.vue'
import { RouterLink } from 'vue-router'
import { ROUTE_NAMES } from '@/router'

interface IPersonCardInterface {
  person: IPerson
}

const props = defineProps<IPersonCardInterface>()
const profile_picture = `https://image.tmdb.org/t/p/w342/${props.person.profile_path}`
const personURL = { name: ROUTE_NAMES.PERSON, params: { id: props.person.id } }

const params = {
  width: 185 + 'px',
  height: 277.5 + 'px',
}
</script>

<style scoped>
.wrapper {
  width: 185px;
  height: 277.5px;
  border-radius: var(--radius);
  overflow: hidden;
}
</style>
