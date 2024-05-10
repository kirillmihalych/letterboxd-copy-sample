import type { IAddMovieToListArgs } from '@/interfaces/lists-types'
import { ACCESS_TOKEN } from '../keys'
import { getSessionFromLocalStorage } from '@/local-storage/getSession'

const session_id = getSessionFromLocalStorage()

const addMovie = async (obj: IAddMovieToListArgs) => {
  const optionsPostMovieToList = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: ACCESS_TOKEN,
    },
    body: JSON.stringify({
      media_id: obj.movie_id,
    }),
  }

  let response = null
  if (session_id) {
    response = await (
      await fetch(
        `https://api.themoviedb.org/3/list/${obj.list_id}/add_item?session_id=${obj.session_id}`,
        optionsPostMovieToList
      )
    ).json()
  }
  return response
}

export default addMovie
