import { getSessionFromLocalStorage } from '@/local-storage/getSession'
import { ACCESS_TOKEN } from '../keys'

const session_id = getSessionFromLocalStorage()

const createList = async (title: string, description: string) => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: ACCESS_TOKEN,
    },
    body: JSON.stringify({
      name: title,
      description: description,
      language: 'en',
    }),
  }

  let response = null
  if (session_id) {
    response = await (
      await fetch(
        `https://api.themoviedb.org/3/list?session_id=${session_id}`,
        options
      )
    ).json()
  }

  console.log(response)
  return response
}

export default createList
