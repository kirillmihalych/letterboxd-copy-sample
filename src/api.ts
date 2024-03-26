import { API_KEY } from './keys'

const recentMoviesOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: API_KEY,
  },
}

const recentMoviesURL =
  'https://api.themoviedb.org/3/movie/now_playing?language=ru&page=1'

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

  console.log(movieDetails)

  return movieDetails
}

// ================================
