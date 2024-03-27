<template>
  <nav class="nav-info">
    <a href="#cast"> cast </a>
    <a href="#crew"> crew </a>
    <a href="#details"> details </a>
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
    <!-- <section v-show="isGenresShowed">
      <GenresList />
    </section> -->
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import GenresList from './GenresList.vue'
import DetailsList from './DetailsList.vue'
import CastList from './CastList.vue'
import CrewList from './CrewList.vue'
import type { IMovie } from '@/types'

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
</script>

<style scoped>
.nav-info {
  display: flex;
}
</style>
