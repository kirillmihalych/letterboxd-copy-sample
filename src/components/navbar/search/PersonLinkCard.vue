<template>
  <div class="person-card-container">
    <RouterLink :to="`/persons/${props.person.id}`" class="content-container">
      <img :src="poster" alt="poster" class="person-image" />
      <div class="person-info">
        <h1>{{ props.person.name }}</h1>
        <div class="additional-info">
          <p>
            {{ props.person.original_name }}
          </p>
          <!-- <p>{{ props.person }}</p> -->
        </div>
      </div></RouterLink
    >
  </div>
</template>

<script setup lang="ts">
import type { IPerson } from '@/interfaces/movie-types'
import { RouterLink } from 'vue-router'

interface IPersonCard {
  person: IPerson
}

const props = defineProps<IPersonCard>()

const poster = `https://image.tmdb.org/t/p/original/${props.person.profile_path}`
</script>

<style scoped>
.person-card-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75px;
  margin: 1rem 0rem;
}

.person-card-container {
  height: 80px;
}

.person-image {
  object-fit: contain;
  width: 50px;
  height: 75px;
}

.additional-info {
  display: flex;
  gap: 0.5rem;
}

.content-container {
  width: 400px;
  text-decoration: none;
  color: #222;
  background: lightgray;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 1rem;
  padding: 5px;
}

.content-container:hover {
  background: #ac94f4;
  cursor: pointer;
}
</style>
