import { getSessionFromLocalStorage } from '@/local-storage/getSession'
import { ACCESS_TOKEN } from '../keys'

const session_id = getSessionFromLocalStorage()

const options = {
  method: 'DELETE',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

const deleteList = async (list_id: number) => {
  let response = null
  if (session_id) {
    response = await (
      await fetch(
        `https://api.themoviedb.org/3/list/${list_id}?session_id=${session_id}`,
        options
      )
    ).json()
  }
  return response
}

export default deleteList
