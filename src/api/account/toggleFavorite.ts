import type { IFavoriteMovie } from '@/interfaces/movie-types'
import { ACCESS_TOKEN } from '../keys'
import { getSessionFromLocalStorage } from '@/local-storage/getSession'

const session_id = getSessionFromLocalStorage()

const toggleFavorite = async (account_id: number, body: IFavoriteMovie) => {
  const optionsAddToFavorite = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: ACCESS_TOKEN,
    },
    body: JSON.stringify(body),
  }

  let response = null
  if (session_id) {
    response = await (
      await fetch(
        `https://api.themoviedb.org/3/account/${account_id}/favorite?session_id=${session_id}`,
        optionsAddToFavorite
      )
    ).json()
  }
  return response
}

export default toggleFavorite
