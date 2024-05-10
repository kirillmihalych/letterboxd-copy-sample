import { ACCESS_TOKEN } from '../keys'
import setToken from '@/local-storage/setToken'

const createRequestOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

const getRequestToken = async () => {
  const response = await (
    await fetch(
      'https://api.themoviedb.org/3/authentication/token/new',
      createRequestOptions
    )
  ).json()
  setToken(response.request_token)
  return response.request_token
}

export default getRequestToken
