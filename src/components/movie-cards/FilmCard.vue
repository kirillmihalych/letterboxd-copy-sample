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
    <div v-show="isMenuOpen">
      <div v-show="!isUserAuthorized" class="user-not-authorized">
        You are not an authorized.
      </div>
      <div v-show="isUserAuthorized">
        <div class="rating-container">
          <RatingHandler
            :movie_id="movie.id"
            :rating="rating"
            :release="movie.release_date"
            :isRatingLoading="isAccountStateLoading"
            @update="(value) => updateRatingHandler(value)"
          />
        </div>
        <div class="list-actions">
          <button
            class="list-actions-btn"
            @click="postToggleFavorite(user.accountDetails?.id as number)"
            :class="{ favorite: isFavorite }"
          >
            {{ toggleFavoriteLoading ? '...' : 'Favorite' }}
          </button>
          <button
            class="list-actions-btn"
            @click="fetchAddToWatchlist(user.accountDetails?.id as number)"
            :class="{ watchlist: isWatchlist }"
          >
            {{ toggleWatchlistLoading ? '...' : 'Watchlist' }}
          </button>
          <button class="list-actions-btn" @click="openModalHandler">
            lists
          </button>
        </div>
      </div>
    </div>

    <ModalListHandler
      :isOpen="isModalOpen"
      :movie_id="movie.id"
      @close="isModalOpen = false"
    >
      <template #modal-header>
        <h3>Select a list</h3>
      </template>
      <template #modal-content>
        <ListsComponent :isModalOpen="isModalOpen" :movie_id="movie.id" />
      </template>
      <!-- <template #modal-actions>
        <button class="add-movie-btn" :disabled="isUserAuthorized">
        </button>
      </template> -->
    </ModalListHandler>
  </div>
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
import { useUserStore } from '@/stores/user'
import getAccountState from '@/api/account/getAccountState'
import toggleWatchlist from '@/api/account/toggleWatchlist'
import toggleFavorite from '@/api/account/toggleFavorite'
import type { IRatedMovie } from '@/interfaces/account-types'
import { getSessionFromLocalStorage } from '@/local-storage/getSession'
import ImagePlaceholder from '../ImagePlaceholder.vue'
import RatingHandler from './RatingHandler.vue'
import ListsComponent from './ListsComponent.vue'

interface FilmCardProps {
  movie: IMovie | IRatedMovie
}

const user = useUserStore()
const isUserAuthorized = getSessionFromLocalStorage() ? true : false

const props = defineProps<FilmCardProps>()
const movie = ref<IMovie>(props.movie as IMovie)

const cssParams: CSSProperties = {
  width: 235 + 'px',
  height: 351 + 'px',
}

const isMenuOpen = ref(false)
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value)
const isModalOpen = ref(false)

const accountState = ref()
const rating = ref<number | undefined>(undefined)
const updateRatingHandler = (new_value: number | undefined) => {
  rating.value = new_value
}
const isFavorite = ref(false)
const setIsFavorite = () => (isFavorite.value = accountState.value.favorite)
const toggleFavoriteLoading = ref(false)
const isAccountStateLoading = ref(false)

const isWatchlist = ref(false)
const setIsWatchlist = () => (isWatchlist.value = accountState.value.watchlist)
const toggleWatchlistLoading = ref(false)

const postToggleFavorite = async (account: number) => {
  const favoriteMovie: IFavoriteMovie = reactive({
    media_type: 'movie',
    media_id: movie.value.id,
    favorite: !accountState.value.favorite,
  })

  toggleFavoriteLoading.value = true
  try {
    await toggleFavorite(account, favoriteMovie)
    fetchAccountState()
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message.toString())
    }
  }
}

const fetchAccountState = async () => {
  isAccountStateLoading.value = true
  try {
    accountState.value = await getAccountState(movie.value.id)
    setIsFavorite()
    setIsWatchlist()
    updateRatingHandler(accountState.value.rated.value)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message.toString())
    }
  } finally {
    toggleFavoriteLoading.value = false
    toggleWatchlistLoading.value = false
    isAccountStateLoading.value = false
  }
}

const fetchAddToWatchlist = async (account: number) => {
  const watchlistMovie: IWatchListMovie = reactive({
    media_type: 'movie',
    media_id: movie.value.id,
    watchlist: !accountState.value.watchlist,
  })

  toggleWatchlistLoading.value = true
  try {
    await toggleWatchlist(account, watchlistMovie)
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

const openModalHandler = () => {
  isModalOpen.value = true
}
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

.rating-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background: darkgrey;
  color: #222;
  position: absolute;
  z-index: 100;
  height: 100px;
  left: 0;
  right: 0;
  bottom: 52px;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  border-top: 2px solid #222;
}

.list-actions {
  background: darkgrey;
  color: #222;
  position: absolute;
  z-index: 100;
  height: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-transform: capitalize;
  border-top: 2px solid #222;
}

.list-actions-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 78px;
  padding: 1rem;
  border: none;
  background: darkgrey;
  text-transform: capitalize;
}

.list-actions-btn:hover {
  cursor: pointer;
  background: lightgrey;
}

.favorite {
  background: #ac94f4;
}

.favorite:hover {
  background: #651fff;
}

.watchlist {
  background: #ac94f4;
}

.watchlist:hover {
  background: #651fff;
}

.add-movie-btn {
  border: none;
  padding: 0.5rem 1rem;
  text-transform: capitalize;
  cursor: pointer;
  background: slategray;
}

.add-movie-btn:hover {
  background: lightgrey;
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

.card-title {
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

.btn-options {
  border: none;
  background: snow;
  border: 2px solid #222;
  color: #222;
  text-transform: capitalize;
  cursor: pointer;
}

.user-not-authorized {
  display: flex;
  align-items: center;
  justify-content: center;
  background: darkgrey;
  color: #222;
  position: absolute;
  z-index: 100;
  height: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  border-top: 2px solid #222;
}
</style>
