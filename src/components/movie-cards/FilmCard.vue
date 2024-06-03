<template>
  <div
    class="film-card"
    @mouseleave="isMenuOpen = false"
    @mouseenter="isMenuOpen = true"
  >
    <RouterLink :to="singleMovieURL">
      <ImagePlaceholder
        :src="poster"
        :title="movie.title"
        :imgParams="styles"
      />
    </RouterLink>
    <h4>Movie name</h4>
    <div class="user-actions-wrapper" v-show="true">
      <UserActionsMenu
        :movie_id="movie.id"
        :release="movie.release_date"
        :vote_average="movie.vote_average"
        :vote_count="movie.vote_count"
      />
    </div>
    <button class="open-menu-btn" @click="toggleMenu">
      <v-icon icon="mdi-dots-vertical" />
    </button>
  </div>
</template>

<script setup lang="ts">
import UserActionsMenu from '@/user-actions/UserActionsMenu.vue'
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

const isMenuOpen = ref(false)
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value)

const poster = `https://image.tmdb.org/t/p/w342/${movie.value.poster_path}`
const singleMovieURL = `/movies/movie_page/${movie.value.id}`
const styles: CSSProperties = {
  width: 185 + 'px',
  height: 277.5 + 'px',
}
</script>

<style scoped>
.film-card {
  width: 185px;
  height: 100%;
  position: relative;
  z-index: 0;
  background-color: var(--light-grey);
  border-radius: var(--radius);
  overflow: hidden;
}

.film-card:hover {
  cursor: pointer;
  opacity: 0.925;
}

/* .user-actions-wrapper {
  width: 185px;
  width: 100%;
  position: absolute;
  bottom: 0;
} */

.open-menu-btn {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  padding: 0.25rem;
  background-color: rgba(0, 0, 0, 65%);
  border-radius: 50%;
}

.open-menu-btn:hover {
  cursor: pointer;
}
</style>
