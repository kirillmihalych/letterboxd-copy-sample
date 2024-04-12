<template>
  <div class="film-card">
    <RouterLink :to="singleMovieURL">
      <ImagePlaceholder
        :src="poster"
        :title="movie.title"
        :imgParams="cssParams"
      />
    </RouterLink>
    <div class="btn-container">
      <button class="btn-options" @click="toggleMenu">
        {{ isMenuOpen ? 'close' : 'open' }}
      </button>
    </div>
    <div class="lists-options" v-show="isMenuOpen">
      <button
        @click="fetchAddToFavorite(user.accountDetails?.id as number)"
        :class="{ favorite: isFavorite }"
      >
        favorite
      </button>
      <!-- <hr /> -->
      <button>watchlist</button>
      <!-- <hr /> -->
      <button>other</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  onMounted,
  onUpdated,
  reactive,
  ref,
  watchEffect,
  type CSSProperties,
} from 'vue'
import type { IFavoriteMovie, IMovie } from '@/interfaces/movie-types'
import { RouterLink } from 'vue-router'
import ImagePlaceholder from '../ImagePlaceholder.vue'
import { useUserStore } from '@/stores/user'
import { addToFavorite, getAccountMovieState } from '@/api/movie'

const user = useUserStore()

interface FilmCardProps {
  movie: IMovie
}

const props = defineProps<FilmCardProps>()
const movie = ref<IMovie>(props.movie)

const cssParams: CSSProperties = {
  width: 235 + 'px',
  height: 351 + 'px',
}

const isMenuOpen = ref(false)
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value)

const accountState = ref()
const isFavorite = ref(false)
const setIsFavorite = () => (isFavorite.value = accountState.value.favorite)

const fetchAddToFavorite = async (account: number) => {
  const favoriteMovie: IFavoriteMovie = reactive({
    media_type: 'movie',
    media_id: movie.value.id,
    favorite: !accountState.value.favorite,
  })

  try {
    await addToFavorite(account, favoriteMovie)
    fetchAccountState()
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message.toString())
    }
  }
}

const fetchAccountState = async () => {
  try {
    accountState.value = await getAccountMovieState(movie.value.id)
    setIsFavorite()
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message.toString())
    }
  }
}

onMounted(() => {
  fetchAccountState()
})

const poster = `https://image.tmdb.org/t/p/original/${movie.value.poster_path}`
const singleMovieURL = `/films/movie_page/${movie.value.id}`
</script>

<style scoped>
.img-card {
  box-sizing: border-box;
}

.film-card {
  position: relative;
  z-index: 0;
}

.btn-container {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  z-index: 10;
}

.lists-options {
  background: snow;
  color: #222;
  border: 1px solid #222;
  border-radius: 0.2rem;
  position: absolute;
  z-index: 100;
  left: 0;
  right: 0;
  bottom: 2rem;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
}

.lists-options button {
  padding: 1.125rem;
  border: none;
}

.lists-options button:hover {
  cursor: pointer;
  background: lightgrey;
}

.favorite {
  background: #2d8f4e;
}
</style>
