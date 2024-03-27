<template>
  <div>
    <p>
      компании создатели :
      <span v-for="company in props.productionCompanies" :key="company.id">
        {{ company.name }}
      </span>
    </p>
    <p>
      страны создатели :
      <span v-for="country in props.productionCountries" :key="country.name">
        {{ country.name }}
      </span>
    </p>
    <p>
      оригинал тайтл: <span> {{ props.originalTitle }}</span>
    </p>
    <p>
      жанры
      <span v-for="genre in props.genres" :key="genre.id">
        {{ genre.name }}</span
      >
    </p>
    <p>
      язык оригинала:
      <span>
        {{ props.originalLanguage }}
      </span>
    </p>
    <p>
      языки в фильме:
      <span v-for="languages in props.spokenLanguages" :key="languages.name">
        {{ languages.name }}
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
import type {
  IGenre,
  ILanguage,
  IProductionCompany,
  IProductionCountry,
} from '@/types'

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

<style scoped></style>
