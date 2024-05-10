import type {
  IAddMovieToListArgs,
  IClearList,
  IDeleteList,
  INewList,
} from '@/interfaces/lists-types'
import { ACCESS_TOKEN } from './keys'

const getOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

const optionsPost = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

const optionsDelete = {
  method: 'DELETE',
  headers: {
    accept: 'application/json',
    Authorization: ACCESS_TOKEN,
  },
}

export const postNewList = async (newList: INewList, session_id: number) => {
  const postNewListOptions = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: ACCESS_TOKEN,
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

export const loadUsersLists = async (
  account_id: number,
  session_id: string
) => {
  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/account/${account_id}/lists?page=1&session_id=${session_id}`,
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

// ====================================
export const postRemoveMovie = async (obj: IAddMovieToListArgs) => {
  const optionsRemoveMovie = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: ACCESS_TOKEN,
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
  return response
}

// ====================================

export const postClearMovies = async (obj: IClearList) => {
  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/list/${obj.list_id}/clear?session_id=${obj.session_id}&confirm=${obj.confirm}`,
      optionsPost
    )
  ).json()
  return response
}

// ====================================

export const deleteList = async (obj: IDeleteList) => {
  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/list/${obj.list_id}?session_id=${obj.session_id}`,
      optionsDelete
    )
  ).json()
  return response
}
