<template>
  <div class="multi-search-wrapper" >
    <div class="navbar-search-container">
      <input
        type="text"
        v-model="query"
        placeholder="Movies and persons"
        class="navbar-search-input"
        @focus="openDropdown"
        @focusout="delayedClose"
      >
     </input>
      <v-icon icon="mdi-magnify" class="magnify-icon" />
    </div>
     <DropdownList :isDropdownShown="isDropdownShown" :styles="stylesDropdownList">
      <template #loading v-if="isLoading">
        <div class="loading-error-wrapper">
          <IconSpinner />
        </div>
      </template>
      <template #error v-if="error">
        <div class="loading-error-wrapper">
          <p>{{ error }}</p>
        </div>
      </template>
      <template #dropdown-list>
        <div v-if="isQueryEmpty">
          <div class="list-wrapper">
            <h4 class="title">Movies</h4>
            <MovieSearchCard
              v-for="movie in preloadedMovies"
              :key="movie.id"
              :movie="movie"
            />
          </div>
          <div class="list-wrapper">
            <h4 class="title">Persons</h4>
            <PersonSearchCard
              v-for="person in preloadedPeople"
              :key="person.id"
              :person="person"
            />
          </div>
        </div>
        <div v-if="isMoviesFound" class="list-wrapper">
          <h4 class="title">Movies</h4>
          <MovieSearchCard
            v-for="movie in movies"
            :key="movie.id"
            :movie="movie"
          />
        </div>
        <div v-if="isPersonsFound" class="list-wrapper">
          <h4 class="title">Persons</h4>
          <PersonSearchCard
            v-for="person in persons"
            :key="person.id"
            :person="person"
          />
        </div>
      </template>
    </DropdownList>
   
  </div>
</template>

<script setup lang="ts">
import getSearchResults from '@/api/search/getSearchResults'
import _ from 'lodash'
import { computed, onMounted, ref, watch, type CSSProperties } from 'vue'
import type { IMovie, IPerson } from '@/interfaces/movie-types'
import DropdownList from '@/components/dropdown-list/DropdownList.vue'
import MovieSearchCard from '@/components/movie-cards/MovieSearchCard.vue'
import PersonSearchCard from '@/components/person-card/PersonSearchCard.vue'
import IconSpinner from '@/components/error-handling/IconSpinner.vue'
import getPopularPeople from '@/api/persons/getPopularPeople'
import getTrendingMovies from '@/api/movies/getTrendingMovies'

const query = ref('')
const isDropdownShown = ref(false)
const openDropdown = () => (isDropdownShown.value = true)
const closeDropdown = () => (isDropdownShown.value = false)
const delayedClose = () => {
  setTimeout(() => {
    closeDropdown()
  }, 150)
}
const stylesDropdownList: CSSProperties = {
  width: 350 + 'px'
}

const preloadedPeople = ref<IPerson[] | null>(null)
const preloadedMovies = ref<IMovie[] | null>(null)
const movies = ref<IMovie[] | null>(null)
const persons = ref<IPerson[] | null>(null)
const error = ref<string | null>(null)
const isLoading = ref(false)

const isPersonsFound = computed(() => {
  return persons.value !== null && persons.value.length > 0
})

const isMoviesFound = computed(() => {
  return movies.value !== null && movies.value.length > 0
})

const isQueryEmpty = computed(() => {
  return query.value.length < 1
})

const getSearchResultsHandler = async () => {
  movies.value = null
  persons.value = null
  error.value = null
  if (query.value.length > 0) {
    let value = query.value.trim()
    try {
      isLoading.value = true
      let response = await getSearchResults(value, 1)
      movies.value = response.movies
      persons.value = response.persons
      openDropdown()
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message.toString()
      }
      console.log(error)
    } finally {
      if (!isMoviesFound.value && !isPersonsFound.value) {
        error.value = 'There is no results by your query'
      }
      isLoading.value = false
    }
  }
}

const preloadContent = async () => {
  preloadedPeople.value = (await getPopularPeople()).slice(0, 3)
  preloadedMovies.value = (await getTrendingMovies()).slice(0, 3)
}

watch(
  query,
  _.debounce(() => {
    getSearchResultsHandler()
  }, 500)
)

onMounted(() => {
  preloadContent()
})
</script>

<style scoped>
.navbar-search-container {
  display: flex;
  z-index: 200;
  position: relative;
}

.toggle-search-bar {
  text-decoration: none;
}

.navbar-search-input {
  padding: 0.5rem 1rem;
  outline: none;
  border-radius: var(--radius);
  
}

.magnify-icon {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: slategray;
}

.title {
  border-left: 5px solid red;
  padding-left: 2rem;
  margin-bottom: 1rem;
}

.list-wrapper {
  margin-bottom: 1rem;
  display: grid;
  gap: 0.5rem;
}

.loading-error-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
}
</style>
