import getAccountID from '@/local-storage/getAccountID'
import { getSessionFromLocalStorage } from '@/local-storage/getSession'
import { ACCESS_TOKEN } from '../keys'

const optionsRatedMovies = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

const session_id = getSessionFromLocalStorage()
const account_id = getAccountID()

const getRatedMovies = async (page: number) => {
  let response = null
  if (session_id) {
    response = await (
      await fetch(
        `https://api.themoviedb.org/3/account/${account_id}/rated/movies?language=en-US&page=${page}&session_id=${session_id}&sort_by=created_at.asc`,
        optionsRatedMovies
      )
    ).json()
  }
  return response
}

export default getRatedMovies
