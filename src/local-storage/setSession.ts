const SESSION_KEY = 'session-id'

const setSession = (payload: string): void => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(payload))
}

export default setSession
