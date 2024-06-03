import { ACCESS_TOKEN } from '../keys'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

const getListStatus = async (list_id: number, movie_id: number) => {
  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/list/${list_id}/item_status?language=en-US&movie_id=${movie_id}`,
      options
    )
  ).json()
  return response.item_present
}

export default getListStatus
