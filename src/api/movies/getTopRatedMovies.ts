import type { IFilterOptions } from '@/interfaces/movie-types'
import { ACCESS_TOKEN } from '../keys'

const optionsTopRated = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

const getTopRatedMovies = async (options: IFilterOptions) => {
  const genre_option = options.genres.reduce(
    (accStr, currStr) => (accStr += `${currStr}%2C`),
    ''
  )
  const votes_option = options.min_amount_votes
  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${options.page}&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=${votes_option}&primary_release_date.gte=${options.from_primary_release}&primary_release_date.lte=${options.to_primary_release}&with_genres=${genre_option}`,
      optionsTopRated
    )
  ).json()
  // console.log(`top rated fetched ${response}`)
  return response
}

export default getTopRatedMovies
