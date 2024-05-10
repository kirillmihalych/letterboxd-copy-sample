import type { IWatchListMovie } from '@/interfaces/movie-types'
import { getSessionFromLocalStorage } from '@/local-storage/getSession'
import { ACCESS_TOKEN } from '../keys'

const session_id = getSessionFromLocalStorage()

const toggleWatchlist = async (account: number, body: IWatchListMovie) => {
  const optionsAddToWatchlist = {
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
        `https://api.themoviedb.org/3/account/${account}/watchlist?session_id=${session_id}`,
        optionsAddToWatchlist
      )
    ).json()
  }

  return response
}

export default toggleWatchlist
