import { ACCESS_TOKEN } from '../keys'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

const getMovie = async (id: string) => {
  const baseURL = `https://api.themoviedb.org/3/movie/${id}?`
  const params = new URLSearchParams({
    language: 'en-EN',
    append_to_response: 'credits',
  })
  const constructedURL = baseURL + params
  const movie = await (await fetch(constructedURL, options)).json()
  return movie
}

export default getMovie
