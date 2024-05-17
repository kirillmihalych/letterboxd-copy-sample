import { getSessionFromLocalStorage } from '@/local-storage/getSession'
import { ACCESS_TOKEN } from '../keys'

const session_id = getSessionFromLocalStorage()

const addRating = async (rating: number, id: number) => {
  const optionsAddRating = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: ACCESS_TOKEN,
    },
    body: `{"value":${rating}}`,
  }

  let response = null
  if (session_id) {
    response = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/${id}/rating?session_id=${session_id}`,
        optionsAddRating
      )
    ).json()
  }

  return response
}

export default addRating
