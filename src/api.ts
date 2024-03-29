import { API_KEY } from './keys'

const recentMoviesOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: API_KEY,
  },
}

const recentMoviesURL =
  'https://api.themoviedb.org/3/movie/now_playing?language=ru-RU&page=1&region=RU'

export const loadRecentMovies = async () => {
  const options = recentMoviesOptions
  const recentMovies = await (await fetch(recentMoviesURL, options)).json()
  return recentMovies.results
}

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

export const fetchByTitle = async (name: string) => {
  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=ru&page=1`,
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

export const loadPopularMovies = async () => {
  const response = await (
    await fetch(
      'https://api.themoviedb.org/3/movie/popular?language=ru-RU&page=1&region=RU',
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
  console.log(response.results)
  return response.results
}
