import { ACCESS_TOKEN } from '../keys'
import type {
  IFavoriteMovie,
  IGenre,
  IWatchListMovie,
} from '../interfaces/movie-types'
import type { IDiscoverOptions } from '../interfaces/movie-types'
import { getSessionFromLocalStorage } from '@/local-storage/getSession'

// ===========================================
const movieDetailsOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

export const loadMovieById = async (id: string) => {
  const movieDetails = await (
    await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-EN&append_to_response=credits`,
      movieDetailsOptions
    )
  ).json()
  return movieDetails
}

// ================================
const searchOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

export const fetchByTitle = async (query: string) => {
  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
      searchOptions
    )
  ).json()
  return response.results
}

// =======================================

export const fetchMultiResultsByQuery = async (query: string) => {
  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`,
      searchOptions
    )
  ).json()
  return response
}

// =======================================

const optionsPopular = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

export const loadPopularMovies = async (options: IDiscoverOptions) => {
  const sort_option = 'popularity.desc'
  const genre_option = options.genres.reduce(
    (accStr, currStr) => (accStr += `${currStr}%2C`),
    ''
  )
  const votes_option = options.min_amount_votes
  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=${sort_option}&with_genres=${genre_option}&vote_count.gte=${votes_option}`,
      optionsPopular
    )
  ).json()
  return response.results
}

// ========================================

const optionsUpcoming = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

const date = new Date()
let day = date.getDate()
let month = date.getMonth() + 1
let year = date.getFullYear()

export const loadUpcomingMovies = async (options: IDiscoverOptions) => {
  const from_date = `${year}-${month}-${day}`
  const to_date = `${year + 1}-${month}-${day}`
  const sort_option =
    options.sort_by.length > 0 ? options.sort_by : 'popularity.desc'
  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=${sort_option}&with_release_type=2|3&primary_release_date.gte=${from_date}&primary_release_date.lte=${to_date}`,
      optionsUpcoming
    )
  ).json()
  return response.results
}

// ========================================

const optionsTopRated = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

export const loadTopRatedMovies = async (options: IDiscoverOptions) => {
  const genre_option = options.genres.reduce(
    (accStr, currStr) => (accStr += `${currStr}%2C`),
    ''
  )
  const votes_option = options.min_amount_votes
  const from_date = options.from_primary_release
  const to_date = options.to_primary_release
  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=${votes_option}&primary_release_date.gte=${from_date}&primary_release_date.lte=${to_date}&with_genres=${genre_option}`,
      optionsTopRated
    )
  ).json()
  return response.results
}

// =================================

const optionsVideo = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

export const loadVideoById = async (id: number) => {
  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      optionsVideo
    )
  ).json()
  const result = response.results.find(({ name }: any) =>
    name.includes('Official Trailer')
  )
  return result
}

// ====================================

const optionsTrending = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

export const loadTrendingToday = async () => {
  const response = await (
    await fetch(
      'https://api.themoviedb.org/3/trending/movie/day?language=ru-RU',
      optionsTrending
    )
  ).json()
  return response.results
}

// =================================
const optionsGenreList = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

export const loadGenreList = async () => {
  const { genres } = await (
    await fetch(
      'https://api.themoviedb.org/3/genre/movie/list?language=ru-RU',
      optionsGenreList
    )
  ).json()
  //
  return genres
}

// ===================================
const optionsSort = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

export const doDiscoverMovies = async (options: IDiscoverOptions) => {
  const genres = options.genres.reduce(
    (accStr, currStr) => (accStr += `${currStr}%2C`),
    ''
  )
  const minVotes = options.min_amount_votes
  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ru-RU&page=1&sort_by=${options.sort_by}&with_genres=${genres}&vote_count.gte=${minVotes}&with_release_type=2|3&release_date.gte=2024-04-01`,
      optionsSort
    )
  ).json()
  return response
}

// ==================================

export const addRating = async (rating: string, id: number) => {
  const session_id = getSessionFromLocalStorage()

  const optionsAddRating = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: ACCESS_TOKEN,
    },
    body: `{"value":${rating}}`,
  }

  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/movie/${id}/rating?session_id=${session_id}`,
      optionsAddRating
    )
  ).json()
  return response
}

// =====================================

// 21030265

const optionsAccountStates = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

export const getAccountState = async (movie_id: number) => {
  const session_id = getSessionFromLocalStorage()
  const session_exist = session_id.length > 0

  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/account_states?session_id=${session_id}`,
      optionsAccountStates
    )
  ).json()
  return session_exist ? response.rated.value : false
}

// =========================================

const optionsAccountMovieStates = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

export const getAccountMovieState = async (movie_id: number) => {
  const session_id = getSessionFromLocalStorage()
  const session_exist = session_id.length > 0

  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/account_states?session_id=${session_id}`,
      optionsAccountStates
    )
  ).json()
  return session_exist ? response : false
}

// =========================================

export const addToFavorite = async (account: number, body: IFavoriteMovie) => {
  const optionsAddToFavorite = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: ACCESS_TOKEN,
    },
    body: JSON.stringify(body),
  }

  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/account/${account}/favorite`,
      optionsAddToFavorite
    )
  ).json()
  return response
}

// ====================================

const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: ACCESS_TOKEN,
  },
  body: JSON.stringify({ media_type: 'movie', media_id: 11, watchlist: true }),
}

export const addToWatchlist = async (
  account: number,
  body: IWatchListMovie
) => {
  const optionsAddToWatchlist = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: ACCESS_TOKEN,
    },
    body: JSON.stringify(body),
  }

  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/account/${account}/watchlist`,
      optionsAddToWatchlist
    )
  ).json()
  return response
}

// =================================

const optionsFavoriteMovies = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

export const loadFavoriteMovies = async (account: number) => {
  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/account/${account}/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`,
      optionsFavoriteMovies
    )
  ).json()
  return response
}

// ==================================

const optionsWatchlistMovies = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

export const loadWatchlistMovies = async (account: number) => {
  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/account/${account}/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc`,
      optionsWatchlistMovies
    )
  ).json()
  return response
}
