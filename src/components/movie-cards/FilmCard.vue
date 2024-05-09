<template>
  <article>
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
      <!-- title -->
      <div class="card-footer">
        <div>
          <h1 class="card-title">{{ movie.title }}</h1>
        </div>
        <!-- rating -->
        <div>
          <span class="tmdb-rating">
            TMDB rating:
            <span class="rating-number">
              {{ movie.vote_average.toFixed(0) }}
            </span>
          </span>
        </div>
        <div v-show="(movie as IRatedMovie).rating">
          <span class="my-rating"
            >My rating:
            <span class="rating-number">{{
              (movie as IRatedMovie).rating
            }}</span></span
          >
        </div>
      </div>
      <!-- rating -->
      <div class="lists-options" v-show="isMenuOpen">
        <button
          @click="fetchAddToFavorite(user.accountDetails?.id as number)"
          :class="{ favorite: isFavorite }"
        >
          favorite
        </button>
        <button
          @click="fetchAddToWatchlist(user.accountDetails?.id as number)"
          :class="{ watchlist: isWatchlist }"
        >
          watchlist
        </button>
        <ModalListHandler
          :movie_id="movie.id"
          @add="(payload) => addMovieToList(payload)"
        >
          <template #modal-header>
            <h3>Select a list for the movie</h3>
          </template>
          <template #modal-actions="{ add, close }">
            <button @click="add" :disabled="isUserAuthorized">
              add to the selected list
            </button>
          </template>
        </ModalListHandler>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import ModalListHandler from '@/modals/ModalListHandler.vue'
import { onMounted, reactive, ref, type CSSProperties } from 'vue'
import type {
  IFavoriteMovie,
  IMovie,
  IWatchListMovie,
} from '@/interfaces/movie-types'
import { RouterLink } from 'vue-router'
import ImagePlaceholder from '../ImagePlaceholder.vue'
import { useUserStore } from '@/stores/user'
import {
  addToFavorite,
  addToWatchlist,
  getAccountMovieState,
} from '@/api/movie'
import type { IRatedMovie } from '@/interfaces/user-types'
import type { IAddMovieToListArgs } from '@/interfaces/lists-types'
import { postMovieToList } from '@/api/lists'
import { getSessionFromLocalStorage } from '@/local-storage/getSession'

const user = useUserStore()
const isUserAuthorized = getSessionFromLocalStorage() ? false : true

interface FilmCardProps {
  movie: IMovie | IRatedMovie
}

const props = defineProps<FilmCardProps>()
const movie = ref<IMovie>(props.movie as IMovie)

const cssParams: CSSProperties = {
  width: 235 + 'px',
  height: 351 + 'px',
}

const isMenuOpen = ref(false)
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value)

const accountState = ref()
const isFavorite = ref(false)
const setIsFavorite = () => (isFavorite.value = accountState.value.favorite)
const isWatchlist = ref(false)
const setIsWatchlist = () => (isWatchlist.value = accountState.value.watchlist)

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
    setIsWatchlist()
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message.toString())
    }
  }
}

const fetchAddToWatchlist = async (account: number) => {
  const watchlistMovie: IWatchListMovie = reactive({
    media_type: 'movie',
    media_id: movie.value.id,
    watchlist: !accountState.value.watchlist,
  })

  try {
    await addToWatchlist(account, watchlistMovie)
    fetchAccountState()
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

// add to list
const addMovieToList = async (obj: IAddMovieToListArgs) => {
  try {
    if (obj.session_id !== null) {
      await postMovieToList(obj)
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message.toString())
    }
  }
}
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
  bottom: 0;
  margin-left: auto;
  margin-right: auto;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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

.watchlist {
  background: #2d8f4e;
}

.movie-card-rating {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.my-rating {
  box-sizing: border-box;
  display: block;
  background: #222;
  width: 235px;
  padding: 0.2rem;
  color: snow;
  border-radius: 0.2rem;
}

.tmdb-rating {
  box-sizing: border-box;
  display: block;
  background: #222;
  width: 235px;
  padding: 0.2rem;
  color: snow;
  border-radius: 0.2rem;
  margin-bottom: 0.1rem;
}

.rating-number {
  display: inline-block;
  font-weight: bold;
  background: snow;
  color: #222;
  width: 20px;
  height: 20px;
  text-align: center;
  border-radius: 0.2rem;
}

.card-title {
  /* text-align: center; */
  height: 65px;
  box-sizing: border-box;
  display: block;
  background: #222;
  width: 235px;
  padding: 0.2rem;
  color: snow;
  border-radius: 0.2rem;
  margin: 0.1rem 0rem;
  font-size: 1.25rem;
}

/* .card-footer {
  height: 200px;
} */
</style>
