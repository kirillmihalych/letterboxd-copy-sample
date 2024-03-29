export const setToLocalStorage = (key: string, payload: any) => {
  localStorage.setItem(key, JSON.stringify(payload))
}
