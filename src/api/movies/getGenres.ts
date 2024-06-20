import { ACCESS_TOKEN } from '../keys'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

const getGenres = async () => {
  const baseURL = 'https://api.themoviedb.org/3/genre/movie/list?'
  const params = new URLSearchParams({
    language: 'en',
  })
  const URL = baseURL + params
  const response = await (await fetch(URL, options)).json()
  return response.genres
}

export default getGenres
