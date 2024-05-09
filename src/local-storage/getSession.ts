import { SESSION } from './keys'

export const getSessionFromLocalStorage = () => {
  const session = localStorage.getItem(SESSION)
  if (session) {
    return JSON.parse(session)
  } else {
    return ''
  }
}
