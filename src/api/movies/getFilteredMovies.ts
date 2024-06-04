import { ACCESS_TOKEN } from '../keys'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

const getFilteredMovies = async (sort: string) => {
  const baseURL = 'https://api.themoviedb.org/3/discover/movie?'
  const params = new URLSearchParams({
    sort_by: sort,
    include_adult: 'false',
    include_video: 'false',
    language: 'en-US',
    page: '1',
    'vote_count.gte': '250',
  })
  const URL = baseURL + params
  const response = await (await fetch(URL, options)).json()
  return response
}

export default getFilteredMovies
