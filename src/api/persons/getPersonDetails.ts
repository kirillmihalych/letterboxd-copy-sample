import { ACCESS_TOKEN } from '../keys'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

const getPersonDetails = async (id: number) => {
  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/person/${id}?language=en-US`,
      options
    )
  ).json()
  return response
}

export default getPersonDetails
