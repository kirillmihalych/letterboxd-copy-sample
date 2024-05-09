import { ACCESS_TOKEN } from '@/keys'

// ==================================
const accDetailsOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

export const getAccountDetails = async (session: string) => {
  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/account?ACCESS_TOKEN=ff02400cb67aaef08564df29807e137b&session_id=${session}`,
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
    Authorization: ACCESS_TOKEN,
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
