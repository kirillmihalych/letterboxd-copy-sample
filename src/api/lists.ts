import type { IAddMovieToListArgs, INewList } from '@/interfaces/lists-types'
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
  return response
}

// ===================================
export const postMovieToList = async (obj: IAddMovieToListArgs) => {
  const optionsPostMovieToList = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: API_KEY,
    },
    body: JSON.stringify({
      media_id: obj.movie_id,
    }),
  }

  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/list/${obj.list_id}/add_item?session_id=${obj.session_id}`,
      optionsPostMovieToList
    )
  ).json()
  console.log(response)
  return response
}

// ====================================
export const postRemoveMovie = async (obj: IAddMovieToListArgs) => {
  const optionsRemoveMovie = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: API_KEY,
    },
    body: JSON.stringify({
      media_id: obj.movie_id,
    }),
  }

  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/list/${obj.list_id}/remove_item?session_id=${obj.session_id}`,
      optionsRemoveMovie
    )
  ).json()
  console.log(response)
  return response
}
