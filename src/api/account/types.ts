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
