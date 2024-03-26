export interface IMovie {
  adult?: boolean
  backdrop_path: string
  genre_ids: string[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_data: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  release_date?: string
  credits?: ICredits
}

export interface ICrewMember {
  adult: boolean
  credit_id: string
  department: string
  gender: number
  id: number
  job: string
  know_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
}

export interface ICastMember {
  adult: boolean
  cast_id: string
  character: string
  credit_id: string
  gender: number
  id: number
  know_for_department: string
  name: string
  order: number
  original_name: string
  popularity: number
  profile_path: string
}

export interface ICredits {
  cast: ICastMember[]
  crew: ICrewMember[]
}
