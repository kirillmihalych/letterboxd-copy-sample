<template>
  <RouterLink
    :to="`/persons/${props.person.id}`"
    class="person-search-card-container"
  >
    <ImagePlaceholder
      :src="profile_image"
      :img-params="{ width: 32 + 'px', height: 48 + 'px' }"
      :title="props.person.name"
    />
    <div class="person-title-container">
      <h4>
        {{ props.person.name }}
      </h4>
      <div class="additional-info">
        {{ props.person.known_for_department }}
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { IPerson } from '@/interfaces/movie-types'
import ImagePlaceholder from '../ImagePlaceholder.vue'

interface IPersonSearchCard {
  person: IPerson
}

const props = defineProps<IPersonSearchCard>()
const profile_image = `https://image.tmdb.org/t/p/w92/${props.person.profile_path}`
</script>

<style scoped>
.person-search-card-container {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25rem;
  color: #222;
  overflow: hidden;
  background-color: var(--snow-white);
  border-radius: var(--radius);
}

.person-search-card-container:hover {
  background-color: snow;
}

.person-title-container {
  display: flex;
  align-items: start;
  justify-content: start;
  flex-direction: column;
}
</style>
