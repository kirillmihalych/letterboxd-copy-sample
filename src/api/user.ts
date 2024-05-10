import { ACCESS_TOKEN } from './keys'

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
