import type { IRatedMovie } from './user-types'

export interface IMovie {
  adult?: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  imdb_id: string
  runtime: number
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
  release_date: string
  credits: ICredits
  genres: IGenre[]
  spoken_languages: ILanguage[]
  production_companies: IProductionCompany[]
  production_countries: IProductionCountry[]
}

export interface IMovieResult {
  adult?: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  imdb_id: string
  runtime: number
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
  release_date: string
  credits: ICredits
  genres: IGenre[]
  spoken_languages: ILanguage[]
  production_companies: IProductionCompany[]
  production_countries: IProductionCountry[]
  media_type: string
}

export interface IGenre {
  id: number
  name: string
}

export interface IProductionCountry {
  iso_3166_1: string
  name: string
}

export interface IProductionCompany {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

export interface ILanguage {
  english_name: string
  iso_639_1: string
  name: string
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

export interface IFilters {
  decade: string
  year: string
  genre: number | null
}

export interface IDiscoverOptions {
  genres: number[] | []
  sort_by: string | ''
  min_amount_votes: string
  from_primary_release: string
  to_primary_release: string
}

export interface ITVShow {
  adult: false
  backdrop_path: string
  first_air_date: string
  genre_ids: number[]
  id: number
  media_type: string
  name: string
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  vote_average: number
  vote_count: number
}

export interface IPerson {
  adult: boolean
  gender: number
  id: number
  know_for: IMovie[]
  known_for_department: string
  media_type: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
}

export type ISearchResult = IPerson | ITVShow | IMovieResult

export interface IImageParams {
  width: string
  height: string
}

type MovieMediaType = 'movie'

export interface IFavoriteMovie {
  media_type: MovieMediaType
  media_id: number
  favorite: boolean
}

export interface IWatchListMovie {
  media_type: MovieMediaType
  media_id: number
  watchlist: boolean
}

export type MovieForFilmCard = IMovie | IRatedMovie
