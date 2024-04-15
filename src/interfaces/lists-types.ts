import type { IMovie } from './movie-types'

export interface INewList {
  name: string
  description: string
  language: string
  public?: boolean
}

export interface ICreatedList {
  description: string
  favorite_count: number
  id: number
  iso_639_1: string
  item_count: number
  list_type: string
  name: string
  poster_path: boolean
}

export interface IList {
  created_by: string
  description: string
  favorite_count: number
  id: number
  iso_639_1: string
  item_count: number
  items: IMovie[] | []
  name: string
  page: number
  poster_path: string | null
  total_page: number
  total_results: number
}
