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
import DiscoveredMovieList from '@/views/DiscoveredMovieList.vue'

type Path =
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
  path: Path
  component: Component
}

const routes: IRoute[] = [
  {
    path: '/',
    component: StartView,
  },
  {
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
    component: DiscoveredMovieList,
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
    path: '/lists',
    component: ListsView,
  },
  {
    path: '/:catchAll(.*)',
    component: ErrorView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
