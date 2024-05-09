import { TOKEN_KEY } from './keys'

export const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    return JSON.parse(token)
  } else {
    return null
  }
}
