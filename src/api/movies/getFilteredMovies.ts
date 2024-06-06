import { ACCESS_TOKEN } from '../keys'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

const getFilteredMovies = async (
  sort: string,
  genres: string,
  releaseDateFrom: string,
  releaseDateTo: string,
  rating: string,
  votes: string,
  page: string
) => {
  const baseURL = 'https://api.themoviedb.org/3/discover/movie?'
  const params = new URLSearchParams({
    sort_by: sort,
    include_adult: 'false',
    include_video: 'false',
    language: 'en-US',
    page: page,
    'vote_count.gte': votes,
    with_genres: genres,
    'primary_release_date.gte': releaseDateFrom,
    'primary_release_date.lte': releaseDateTo,
    'vote_average.gte': rating,
    'vote_average.lte': rating,
  })
  const URL = baseURL + params
  const response = await (await fetch(URL, options)).json()

  return response
}

export default getFilteredMovies
