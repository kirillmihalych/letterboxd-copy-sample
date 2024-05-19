import { getSessionFromLocalStorage } from '@/local-storage/getSession'
import { ACCESS_TOKEN } from '../keys'

const session_id = getSessionFromLocalStorage()

const doLogout = async () => {
  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: ACCESS_TOKEN,
    },
    body: JSON.stringify({
      session_id: session_id,
    }),
  }

  const response = await (
    await fetch('https://api.themoviedb.org/3/authentication/session', options)
  ).json()

  return response
}

export default doLogout
