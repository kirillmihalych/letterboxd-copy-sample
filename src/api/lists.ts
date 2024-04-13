import type { INewList } from '@/interfaces/lists-types'
import { API_KEY } from '@/keys'
import { getSessionFromLocalStorage } from '@/local-storage/getSession'

const session_id = getSessionFromLocalStorage()

export const postNewList = async (newList: INewList, session_id: number) => {
  const postNewListOptions = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: API_KEY,
    },
    body: JSON.stringify(newList),
  }
  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/list?session_id=${session_id}`,
      postNewListOptions
    )
  ).json()
  console.log(response)
  return response
}
