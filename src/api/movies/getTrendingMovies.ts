import { ACCESS_TOKEN } from '../keys'

const optionsTrending = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

const getTrendingMovies = async () => {
  const response = await (
    await fetch(
      'https://api.themoviedb.org/3/trending/movie/day?language=ru-RU',
      optionsTrending
    )
  ).json()
  return response.results
}

export default getTrendingMovies
