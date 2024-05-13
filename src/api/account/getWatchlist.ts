import { ACCESS_TOKEN } from '../keys'
import { getSessionFromLocalStorage } from '@/local-storage/getSession'
import getAccountID from '@/local-storage/getAccountID'

const optionsWatchlistMovies = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

const session_id = getSessionFromLocalStorage()
const account_id = getAccountID()

const getWatchlistMovies = async (page: number) => {
  let response = null
  if (session_id) {
    response = await (
      await fetch(
        `https://api.themoviedb.org/3/account/${account_id}/watchlist/movies?language=en-US&page=${page}&session_id=${session_id}&sort_by=created_at.asc`,
        optionsWatchlistMovies
      )
    ).json()
  }
  return response
}

export default getWatchlistMovies
