import type { IFilterOptions } from '@/interfaces/movie-types'
import { ACCESS_TOKEN } from '../keys'

const fetch_options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

const getFilteredMovies = async (options: IFilterOptions) => {
  const genre_option = options.genres.reduce(
    (accStr, currStr) => (accStr += `${currStr}%2C`),
    ''
  )
  // sort_by param is hardcoded, so when list will be loaded, user can specify other params and still be on a certain page
  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${options.page}&sort_by=popularity.desc&with_genres=${genre_option}&vote_count.gte=${options.min_amount_votes}`,
      fetch_options
    )
  ).json()
  return response
}

export default getFilteredMovies
