import { API_KEY } from '@/keys'
import { getSessionFromLocalStorage } from '@/local-storage/getSession'

const createRequestOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: API_KEY,
  },
}

export const createRequestToken = async () => {
  const response = await (
    await fetch(
      'https://api.themoviedb.org/3/authentication/token/new',
      createRequestOptions
    )
  ).json()
  console.log(response)
  return response.request_token
}

// ==================================
const accDetailsOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: API_KEY,
  },
}

export const getAccountDetails = async (session: string) => {
  // const session = getSessionFromLocalStorage()
  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/account?api_key=ff02400cb67aaef08564df29807e137b&session_id=${session}`,
      accDetailsOptions
    )
  ).json()
  console.log(response)
  return response
}

// ==================================
