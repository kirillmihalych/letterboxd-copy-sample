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
        :imgParams="cssParams"
      />
    </RouterLink>
    <div class="user-actions-wrapper" v-show="isMenuOpen">
      <UserActionsMenu
        :movie_id="movie.id"
        :release="movie.release_date"
        :vote_average="movie.vote_average"
        :vote_count="movie.vote_count"
      />
    </div>
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

const cssParams: CSSProperties = {
  width: 185 + 'px',
  height: 277.5 + 'px',
}

const isMenuOpen = ref(false)

const poster = `https://image.tmdb.org/t/p/w342/${movie.value.poster_path}`
const singleMovieURL = `/movies/movie_page/${movie.value.id}`
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

.user-actions-wrapper {
  width: 185px;
  position: absolute;
  bottom: 0;
}
</style>
