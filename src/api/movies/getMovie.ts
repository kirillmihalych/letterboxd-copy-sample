import { ACCESS_TOKEN } from '../keys'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

const getMovie = async (id: number) => {
  const movie = await (
    await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-EN&append_to_response=credits`,
      options
    )
  ).json()
  return movie
}

export default getMovie
