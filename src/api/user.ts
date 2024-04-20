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
  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/account?api_key=ff02400cb67aaef08564df29807e137b&session_id=${session}`,
      accDetailsOptions
    )
  ).json()
  return response
}

// ==================================

const optionsRatedMovies = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: API_KEY,
  },
}

export const loadRatedMovies = async (account_id: number) => {
  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/account/${account_id}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`,
      optionsRatedMovies
    )
  ).json()
  return response
}
