import { ACCESS_TOKEN } from '../keys'
import { getToken } from '@/local-storage/getToken'
import setSession from '@/local-storage/setSession'

const token = {
  request_token: getToken(),
}

const postOptions = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: ACCESS_TOKEN,
  },
  body: JSON.stringify(token),
}

const createSession = async () => {
  const response = await (
    await fetch(
      'https://api.themoviedb.org/3/authentication/session/new',
      postOptions
    )
  ).json()
  setSession(response.session_id)
  window.location.replace('https://f1re-movie-finder.netlify.app/films')

  return response.session_id
}

export default createSession
