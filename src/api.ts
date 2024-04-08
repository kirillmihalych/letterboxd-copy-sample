import { API_KEY } from './keys'
import type { IGenre } from './types'
import type { IDiscoverOptions } from './types'

// ===========================================
const movieDetailsOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: API_KEY,
  },
}

export const loadMovieById = async (id: string) => {
  const movieDetails = await (
    await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=ru&append_to_response=credits`,
      movieDetailsOptions
    )
  ).json()
  console.log(movieDetails)
  return movieDetails
}

// ================================
const searchOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: API_KEY,
  },
}

export const fetchByTitle = async (query: string) => {
  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
      searchOptions
    )
  ).json()
  console.log(response)
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
  return response.results
}

// =======================================

const optionsPopular = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: API_KEY,
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
  console.log(response)
  return response.results
}

// ========================================

const optionsUpcoming = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: API_KEY,
  },
}

export const loadUpcomingMovies = async () => {
  const response = await (
    await fetch(
      'https://api.themoviedb.org/3/movie/upcoming?language=ru-RU&page=1&region=RU',
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
    Authorization: API_KEY,
  },
}

export const loadTopRatedMovies = async () => {
  const response = await (
    await fetch(
      'https://api.themoviedb.org/3/movie/top_rated?language=ru-RU&page=1&region=RU',
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
    Authorization: API_KEY,
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
    Authorization: API_KEY,
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
    Authorization: API_KEY,
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
    Authorization: API_KEY,
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
  console.log(response)
  return response
}
