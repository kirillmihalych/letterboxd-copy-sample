<template>
  <div class="movie-details">
    <div class="details-container">
      <span>Companies</span>
      <div>
        <RouterLink
          to="/"
          v-for="company in props.productionCompanies"
          :key="company.id"
        >
          {{ company.name }}
        </RouterLink>
      </div>
    </div>
    <div class="details-container">
      <span>Countries</span>
      <div>
        <RouterLink
          to="/"
          v-for="country in productionCountries"
          :key="country.name"
        >
          {{ country.name }}
        </RouterLink>
      </div>
    </div>
    <div class="details-container">
      <span>Genres</span>
      <div>
        <RouterLink to="/" v-for="genre in props.genres" :key="genre.id">
          {{ genre.name }}
        </RouterLink>
      </div>
    </div>
    <div class="details-container">
      <span>Film's language</span>
      <div>
        <RouterLink to="/">
          {{ props.originalLanguage.toUpperCase() }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

import type {
  IGenre,
  ILanguage,
  IProductionCompany,
  IProductionCountry,
} from '@/interfaces/movie-types'

interface IDetailsListProps {
  originalTitle: string
  spokenLanguages: ILanguage[]
  originalLanguage: string
  productionCompanies: IProductionCompany[]
  productionCountries: IProductionCountry[]
  genres: IGenre[]
}

const props = defineProps<IDetailsListProps>()
</script>

<style scoped>
.movie-details div {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.genres {
  display: flex;
  gap: 0.25rem;
}

.movie-details a {
  display: inline;
  border: 1px solid black;
  text-decoration: none;
  color: #222;
  padding: 0.1rem 0.2rem;
  border-radius: 0.1rem 0.2rem;
}

.movie-details a {
  display: inline;
  border: 1px solid black;
  text-decoration: none;
  background: lightgrey;
  color: #222;
  padding: 0.1rem 0.2rem;
  border-radius: 0.1rem 0.2rem;
  margin-right: 0.25rem;
  margin-bottom: 0.25rem;
}

.movie-details a:hover {
  transition: all 0.1s;
  background: snow;
}

.details-container {
  margin-bottom: 0.25rem;
}
</style>
