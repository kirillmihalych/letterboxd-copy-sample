import { getSessionFromLocalStorage } from '@/local-storage/getSession'
import { ACCESS_TOKEN, API_KEY } from '../keys'
import getAccountID from '@/local-storage/getAccountID'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

const session_id = getSessionFromLocalStorage()
const account_id = getAccountID()

const getLists = async () => {
  let response = null
  if (session_id) {
    response = await (
      await fetch(
        `https://api.themoviedb.org/3/account/${account_id}/lists?page=1&session_id=${session_id}`,
        options
      )
    ).json()
  }
  return response
}

export default getLists
