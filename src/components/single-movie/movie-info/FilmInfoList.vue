<template>
  <nav class="movie-info-navbar">
    <a href="#cast" :class="{ active: isCastShowed }"> cast </a>
    <a href="#crew" :class="{ active: isCrewShowed }"> crew </a>
    <a href="#details" :class="{ active: isDetailsShowed }"> details </a>
  </nav>
  <main>
    <section v-show="isCastShowed">
      <CastList :castInfo="movieInfo.credits.cast" />
    </section>
    <section v-show="isCrewShowed">
      <CrewList :crewInfo="movieInfo.credits.crew" />
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
const isCrewShowed = ref(false)
const isDetailsShowed = ref(false)

window.addEventListener('hashchange', onHashChange)
onHashChange()

function onHashChange() {
  const location = window.location.hash.replace(/#(?=\S)/g, '')
  if (location === 'cast') {
    isCastShowed.value = true
    isCrewShowed.value = false
    isDetailsShowed.value = false
  }
  if (location === 'crew') {
    isCastShowed.value = false
    isCrewShowed.value = true
    isDetailsShowed.value = false
  }
  if (location === 'details') {
    isCastShowed.value = false
    isCrewShowed.value = false
    isDetailsShowed.value = true
  }
}

watchEffect(() => {
  onHashChange()
})
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

.movie-info-navbar a {
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

.active {
  background: lightgray;
  transition: all 0.1s;
}
</style>
