import type { IFilterOptions } from '@/interfaces/movie-types'
import { ACCESS_TOKEN } from '../keys'

const optionsUpcoming = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

const date = new Date()
const day = date.getDate()
const month = date.getMonth() + 1
const year = date.getFullYear()
const from_date = `${year}-${month}-${day}`
const to_date = `${year + 1}-${month}-${day}`

const getUpcomingMovies = async (options: IFilterOptions) => {
  const genre_option = options.genres.reduce(
    (accStr, currStr) => (accStr += `${currStr}%2C`),
    ''
  )
  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${options.page}&sort_by=${options.sort_by}&with_genres=${genre_option}&with_release_type=2|3&primary_release_date.gte=${from_date}&primary_release_date.lte=${to_date}`,
      optionsUpcoming
    )
  ).json()
  return response
}

export default getUpcomingMovies
