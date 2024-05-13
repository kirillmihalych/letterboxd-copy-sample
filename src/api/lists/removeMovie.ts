import { ACCESS_TOKEN } from '../keys'
import { getSessionFromLocalStorage } from '@/local-storage/getSession'

const session_id = getSessionFromLocalStorage()

const removieMovie = async (movie_id: number, list_id: number) => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: ACCESS_TOKEN,
    },
    body: JSON.stringify({ media_id: movie_id }),
  }

  let response = null
  if (session_id) {
    response = await (
      await fetch(
        `https://api.themoviedb.org/3/list/${list_id}/remove_item?session_id=${session_id}`,
        options
      )
    ).json()
  }
  console.log(response)
  return response
}

export default removieMovie
