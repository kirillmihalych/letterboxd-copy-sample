import { API_KEY } from '@/keys'

const optionsGet = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: API_KEY,
  },
}

export const loadPopularPeople = async () => {
  const response = await (
    await fetch(
      'https://api.themoviedb.org/3/person/popular?language=en-US&page=1',
      optionsGet
    )
  ).json()
  console.log(response)
  return response.results
}
