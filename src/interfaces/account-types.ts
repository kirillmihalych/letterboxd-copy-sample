export interface IAccountDetails {
  avatar: IAvatar
  id: number
  iso_639_1: string
  iso_3166_1: string
  name: string
  include_adult: boolean
  username: string
}

export interface IAvatar {
  gravatar: IGravatar
  tmdb: ITmdbAvatar
}

export interface IGravatar {
  hash: string
}

export interface ITmdbAvatar {
  avatar_path: string | null
}

export interface IRatedMovie {
  adult: false
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  rating?: number
}
