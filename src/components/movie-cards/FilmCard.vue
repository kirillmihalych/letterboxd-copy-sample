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
    <!-- <div class="card-footer">
      <div>
        <span class="tmdb-rating">
          TMDB rating:
          <span class="rating-number">
            {{ movie.vote_average.toFixed(2) }}
          </span>
        </span>
      </div>
    </div> -->
    <div class="user-actions-wrapper" v-show="isMenuOpen">
      <UserActionsMenu
        :style="{ width: 100 + '%' }"
        :movie_id="movie.id"
        :release="movie.release_date"
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

const poster = `https://image.tmdb.org/t/p/w185/${movie.value.poster_path}`
const singleMovieURL = `/movies/movie_page/${movie.value.id}`
</script>

<style scoped>
.film-card {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  width: 185px;
  height: 277.5px;
  position: relative;
  z-index: 0;
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
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 35%);
  color: var(--light-grey);
  cursor: pointer;
}

.btn-options:hover {
  color: var(--snow-white);
}
</style>
