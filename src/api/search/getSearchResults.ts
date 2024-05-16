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
  const media: (IMovie | ITVShow)[] = []
  const persons: IPerson[] = []
  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=true&language=en-US&page=${page}`,
      options
    )
  ).json()
  response.results.forEach((result: any) => {
    if (
      result.media_type === mediaTypes.movie ||
      result.media_type === mediaTypes.tv
    ) {
      media.push(result)
    } else if (result.media_type === mediaTypes.person) {
      persons.push(result)
    }
  })
  return { media: media.slice(0, 3), persons: persons.slice(0, 3) }
}

export default getSearchResults
