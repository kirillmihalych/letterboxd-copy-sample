import { getSessionFromLocalStorage } from '@/local-storage/getSession'
import { ACCESS_TOKEN } from '../keys'

const options = {
  method: 'DELETE',
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: ACCESS_TOKEN,
  },
}

const session_id = getSessionFromLocalStorage()

const deleteRating = async (movie_id: number) => {
  let response = null
  if (session_id) {
    response = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/${movie_id}/rating?session_id=${session_id}`,
        options
      )
    ).json()
  }
  return response
}

export default deleteRating
