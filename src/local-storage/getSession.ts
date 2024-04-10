const SESSION = 'session-id'

export const getSessionFromLocalStorage = () => {
  const session = localStorage.getItem(SESSION)
  if (session) {
    return JSON.parse(session)
  } else {
    return ''
  }
}
