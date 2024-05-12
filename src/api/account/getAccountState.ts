import { getSessionFromLocalStorage } from '@/local-storage/getSession'
import { ACCESS_TOKEN } from '../keys'

const session_id = getSessionFromLocalStorage()

const optionsAccountStates = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

const getAccountState = async (movie_id: number) => {
  let response = null
  if (session_id) {
    response = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/${movie_id}/account_states?session_id=${session_id}`,
        optionsAccountStates
      )
    ).json()
  }
  return response
}

export default getAccountState
