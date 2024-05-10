import { getSessionFromLocalStorage } from '@/local-storage/getSession'
import { ACCESS_TOKEN, API_KEY } from '../keys'

const session_id = getSessionFromLocalStorage()

const accDetailsOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

const getAccountDetails = async () => {
  let response = null
  if (session_id) {
    response = await (
      await fetch(
        `https://api.themoviedb.org/3/account?API_KEY=${API_KEY}&session_id=${session_id}`,
        accDetailsOptions
      )
    ).json()
  }
  return response
}

export default getAccountDetails
