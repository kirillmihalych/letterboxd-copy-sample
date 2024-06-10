<template>
  <h4>Full cast and crew</h4>
  <nav class="movie-info-navbar">
    <button @click="openCast" :class="{ active: isCastShowed }">cast</button>
    <button @click="openCrew" :class="{ active: isCrewShowed }">crew</button>
    <button @click="openDetails" :class="{ active: isDetailsShowed }">
      details
    </button>
  </nav>
  <main>
    <section v-show="isCastShowed">
      <CastList :castInfo="movieInfo.credits.cast" />
    </section>
    <section v-show="isCrewShowed">
      <CrewList :crewMemberList="movieInfo.credits.crew" />
    </section>
    <section v-show="isDetailsShowed">
      <DetailsList
        :originalTitle="movieInfo.original_title"
        :spokenLanguages="movieInfo.spoken_languages"
        :originalLanguage="movieInfo.original_language"
        :productionCompanies="movieInfo.production_companies"
        :productionCountries="movieInfo.production_countries"
        :genres="movieInfo.genres"
      />
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
// import GenresList from './GenresList.vue'
import DetailsList from './DetailsList.vue'
import CastList from './CastList.vue'
import CrewList from './CrewList.vue'
import type { IMovie } from '@/interfaces/movie-types'

interface IFilmInfoListProps {
  movieInfo: IMovie
}

const { movieInfo } = defineProps<IFilmInfoListProps>()

const isCastShowed = ref(true)
const openCast = () => {
  isCastShowed.value = true
  isCrewShowed.value = false
  isDetailsShowed.value = false
}

const isCrewShowed = ref(false)
const openCrew = () => {
  isCrewShowed.value = true
  isCastShowed.value = false
  isDetailsShowed.value = false
}

const isDetailsShowed = ref(false)
const openDetails = () => {
  isDetailsShowed.value = true
  isCastShowed.value = false
  isCrewShowed.value = false
}
</script>

<style scoped>
.movie-info-navbar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75rem;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.movie-info-navbar button {
  box-sizing: border-box;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 0.85rem;
  border: 1px solid black;
  margin-right: 0.25rem;
  margin-bottom: 0.25rem;
  padding: 0.1rem 0.2rem;
  border-radius: 0.1rem;
  color: #222;
}

.movie-info-navbar button:hover {
  cursor: pointer;
  background: rgba(99, 99, 99, 0.15);
}

.active {
  background: lightgray;
  transition: all 0.1s;
}
</style>
