import { ACCESS_TOKEN } from '../keys'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

const getListDetails = async (list_id: number) => {
  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/list/${list_id}?language=en-US&page=1`,
      options
    )
  ).json()
  console.log(response)
  return response
}

export default getListDetails
