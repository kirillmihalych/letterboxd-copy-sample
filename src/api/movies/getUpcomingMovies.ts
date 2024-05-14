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
  // const sort_option =
  //   options.sort_by.length > 0 ? options.sort_by : 'popularity.desc'
  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${options.page}&sort_by=${options.sort_by}&with_release_type=2|3&primary_release_date.gte=${from_date}&primary_release_date.lte=${to_date}`,
      optionsUpcoming
    )
  ).json()
  console.log(`upcomings fetched ${response.results}`)
  return response
}

export default getUpcomingMovies
