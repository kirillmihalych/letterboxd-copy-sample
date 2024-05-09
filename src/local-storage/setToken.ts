const TOKEN_KEY = 'token-tmdb'

const setToken = (payload: string): void => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(payload))
}

export default setToken
