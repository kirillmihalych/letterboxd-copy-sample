import { ACCOUNT_ID } from './keys'

const getAccountID = () => {
  const id = localStorage.getItem(ACCOUNT_ID)
  if (id) {
    return JSON.parse(id)
  } else {
    return null
  }
}

export default getAccountID
