import { createRouter, createWebHistory } from 'vue-router'
import FilmsView from '@/views/FilmsView.vue'
import ListsView from '@/views/ListsView.vue'
import ErrorView from '@/views/ErrorView.vue'
import StartView from '@/views/StartView.vue'
import type { Component } from 'vue'
import SingleFilmView from '@/views/SingleFilmView.vue'
import SearchResultsListView from '@/views/SearchResultsListView.vue'
import PopularMovieListView from '@/views/FIlteredMovieViews/PopularMovieListView.vue'
import UpcomingMovieListView from '@/views/FIlteredMovieViews/UpcomingMovieListView.vue'
import TopRatedMovieListView from '@/views/FIlteredMovieViews/TopRatedMovieListView.vue'
import DiscoveredMovieListView from '@/views/FIlteredMovieViews/DiscoveredMovieListView.vue'
import SearchResultsMovieList from '@/components/movie-lists/SearchResultsMovieList.vue'
import SearchResultsTvList from '@/components/movie-lists/SearchResultsTvList.vue'
import SearchResultsPersonList from '@/components/movie-lists/SearchResultsPersonList.vue'
import LoginPage from '@/views/UserViews/LoginPage.vue'
import AuthPage from '@/views/UserViews/AuthPage.vue'
import AuthApprovedPage from '@/views/UserViews/AuthApprovedPage.vue'
import ProfilePage from '@/views/UserViews/ProfilePage.vue'
import NewList from '@/components/user-lists/NewList.vue'

export type Path =
  | '/:catchAll(.*)'
  | '/films'
  | '/lists'
  | '/:pathMatch(.*)*'
  | '/'
  | '/films/movie_page/:id'
  | '/films/search_results'
  | '/films/search_results/movie'
  | '/films/search_results/tv'
  | '/films/search_results/person'
  | '/films/popular'
  | '/films/upcoming'
  | '/films/top_rated'
  | '/films/discovered_list'
  | '/login'
  | '/auth'
  | '/auth/approved'
  | '/profile'
  | '/profile/favoritelist'
  | '/profile/watchlist'
  | '/profile/ratedlist'
  | '/profile/customlists'
  | '/lists/new'

interface IRoute {
  name?: string
  path: Path
  component: Component
}

export const routes: IRoute[] = [
  {
    path: '/',
    component: StartView,
  },
  {
    name: 'films',
    path: '/films',
    component: FilmsView,
  },
  {
    path: '/films/movie_page/:id',
    component: SingleFilmView,
  },
  {
    path: '/films/search_results',
    component: SearchResultsListView,
  },
  {
    path: '/films/search_results/movie',
    component: SearchResultsMovieList,
  },
  {
    path: '/films/search_results/tv',
    component: SearchResultsTvList,
  },
  {
    path: '/films/search_results/person',
    component: SearchResultsPersonList,
  },
  {
    path: '/films/discovered_list',
    component: DiscoveredMovieListView,
  },
  {
    path: '/films/popular',
    component: PopularMovieListView,
  },
  {
    path: '/films/upcoming',
    component: UpcomingMovieListView,
  },
  {
    path: '/films/top_rated',
    component: TopRatedMovieListView,
  },
  // ==============================
  {
    name: 'lists',
    path: '/lists',
    component: ListsView,
  },
  {
    path: '/:catchAll(.*)',
    component: ErrorView,
  },
]

type NavbarPath = '/films' | '/lists'
type NavbarName = 'Films' | 'Lists'

interface INavbarRoute {
  name: NavbarName
  component: Component
  path: NavbarPath
}

export const navbarRoutes: INavbarRoute[] = [
  {
    name: 'Films',
    component: FilmsView,
    path: '/films',
  },
  {
    name: 'Lists',
    component: ListsView,
    path: '/lists',
  },
]

// =================================
const userRoutes: IRoute[] = [
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/auth',
    component: AuthPage,
  },
  {
    path: '/auth/approved',
    component: AuthApprovedPage,
  },
  {
    path: '/profile',
    component: ProfilePage,
  },
]

// ==================================
const listRoutes: IRoute[] = [
  {
    path: '/lists/new',
    component: NewList,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes.concat(userRoutes).concat(listRoutes),
})

export default router
