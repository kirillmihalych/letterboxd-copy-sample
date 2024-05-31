import { ACCESS_TOKEN } from '../keys'

const optionsGet = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

const getPopularPeople = async () => {
  const response = await (
    await fetch(
      'https://api.themoviedb.org/3/person/popular?language=en-US&page=1',
      optionsGet
    )
  ).json()
  return response.results
}

export default getPopularPeople
