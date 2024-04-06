import { createRouter, createWebHistory } from 'vue-router'
import FilmsView from '@/views/FilmsView.vue'
import ListsView from '@/views/ListsView.vue'
import ErrorView from '@/views/ErrorView.vue'
import StartView from '@/views/StartView.vue'
import type { Component } from 'vue'
import SingleFilmView from '@/views/SingleFilmView.vue'
import SearchResultsView from '@/views/SearchResultsView.vue'
import PopularMovieListView from '@/views/FIlteredMovieViews/PopularMovieListView.vue'
import UpcomingMovieListView from '@/views/FIlteredMovieViews/UpcomingMovieListView.vue'
import TopRatedMovieListView from '@/views/FIlteredMovieViews/TopRatedMovieListView.vue'
import DiscoveredMovieListView from '@/views/DiscoveredMovieListView.vue'

export type Path =
  | '/:catchAll(.*)'
  | '/films'
  | '/lists'
  | '/:pathMatch(.*)*'
  | '/'
  | '/films/movie_page/:id'
  | '/films/search_results'
  | '/films/popular'
  | '/films/upcoming'
  | '/films/top_rated'
  | '/films/discovered_list'

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
    component: SearchResultsView,
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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
