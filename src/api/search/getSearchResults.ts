import type { IMovie, IPerson, ITVShow } from '@/interfaces/movie-types'
import { ACCESS_TOKEN } from '../keys'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

const mediaTypes = {
  person: 'person',
  tv: 'tv',
  movie: 'movie',
}

const getSearchResults = async (query: string, page: number) => {
  const movies: IMovie[] = []
  const persons: IPerson[] = []
  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=true&language=en-US&page=${page}`,
      options
    )
  ).json()
  response.results.forEach((result: any) => {
    if (result.media_type === mediaTypes.movie) {
      movies.push(result)
    } else if (result.media_type === mediaTypes.person) {
      persons.push(result)
    }
  })
  return { movies, persons }
}

export default getSearchResults
