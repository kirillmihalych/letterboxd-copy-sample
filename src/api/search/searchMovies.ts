import { ACCESS_TOKEN } from '../keys'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

const searchMovies = async (query: string) => {
  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
      options
    )
  ).json()
  return response.results
}

export default searchMovies
