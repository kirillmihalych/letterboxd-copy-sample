<template>
  <div class="film-card">
    {{ movie.id }}
    <RouterLink :to="singleMovieURL">
      <ImagePlaceholder
        :src="poster"
        :title="movie.title"
        :imgParams="cssParams"
      />
    </RouterLink>
    <div class="btn-container">
      <button class="btn-options" @click="toggleMenu">
        {{ isMenuOpen ? 'close' : 'menu' }}
      </button>
    </div>
    <div class="card-footer">
      <div>
        <span class="tmdb-rating">
          TMDB rating:
          <span class="rating-number">
            {{ movie.vote_average.toFixed(2) }}
          </span>
        </span>
      </div>
    </div>
    <UserActionsMenu
      :movie_id="movie.id"
      :release="movie.release_date"
      v-show="isMenuOpen"
    />
  </div>
</template>

<script setup lang="ts">
import UserActionsMenu from './UserActionsMenu.vue'
import { ref, type CSSProperties } from 'vue'
import type { IMovie } from '@/interfaces/movie-types'
import { RouterLink } from 'vue-router'
import type { IRatedMovie } from '@/interfaces/account-types'
import ImagePlaceholder from '../ImagePlaceholder.vue'

interface FilmCardProps {
  movie: IMovie | IRatedMovie
}

const props = defineProps<FilmCardProps>()
const movie = ref<IMovie>(props.movie as IMovie)

const cssParams: CSSProperties = {
  width: 185 + 'px',
  height: 277.5 + 'px',
}

const isMenuOpen = ref(false)
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value)

const poster = `https://image.tmdb.org/t/p/w185/${movie.value.poster_path}`
const singleMovieURL = `/films/movie_page/${movie.value.id}`
</script>

<style scoped>
.img-card {
  box-sizing: border-box;
}

.film-card {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  border: 2px solid black;
  position: relative;
  z-index: 0;
}

.film-card:hover {
  cursor: pointer;
  opacity: 0.925;
}

.btn-container {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  z-index: 10;
}

.tmdb-rating {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 1rem;
  background: #222;
  width: 235px;
  padding: 0.2rem;
  color: snow;
}

.rating-number {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  background: snow;
  color: #222;
  width: 40px;
  height: 20px;
  text-align: center;
  border-radius: 0.1rem;
}

.btn-options {
  border: none;
  background: snow;
  border: 2px solid #222;
  color: #222;
  text-transform: capitalize;
  cursor: pointer;
}
</style>
