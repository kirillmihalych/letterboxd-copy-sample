import type { INewList } from '@/interfaces/lists-types'
import { API_KEY } from '@/keys'

const getOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: API_KEY,
  },
}

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

// ==============================

export const loadUsersLists = async (account_id: number) => {
  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/account/${account_id}/lists?page=1`,
      getOptions
    )
  ).json()
  console.log(response)
  return response
}

// ===============================

export const loadListDetails = async (list_id: string) => {
  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/list/${list_id}?language=en-US&page=1`,
      getOptions
    )
  ).json()
  console.log(response)
  return response
}

// ===================================
export const postMovieToList = async (
  list_id: number,
  session_id: string,
  movie_id: number
) => {
  const optionsPostMovieToList = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: API_KEY,
    },
    body: JSON.stringify({
      media_id: movie_id,
    }),
  }

  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/list/${list_id}/add_item?session_id=${session_id}`,
      optionsPostMovieToList
    )
  ).json()
  console.log(response)
  return response
}
