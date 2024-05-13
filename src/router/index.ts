import { createRouter, createWebHistory } from 'vue-router'
import BaseLayout from '@/views/BaseLayout.vue'
import ListsView from '@/views/ListsView.vue'
import HomeView from '@/views/HomeView.vue'
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
import AuthApprovedPage from '@/views/UserViews/AuthApprovedPage.vue'
import ProfilePage from '@/views/UserViews/ProfilePage.vue'
import NewList from '@/components/user-lists/NewList.vue'
import ListPage from '@/components/user-lists/ListPage.vue'
import * as VueRouter from 'vue-router'
import PaginatedList from '@/views/UserViews/PaginatedList.vue'

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
  | '/lists/:id'
  | '/:pathMatch(.*)*'

interface IRoute {
  name?: string
  path: Path
  component?: Component
  redirect?: string
}

export const routes: VueRouter.RouteRecordRaw[] = [
  {
    path: '/',
    component: HomeView,
  },
  {
    name: 'films',
    path: '/films',
    component: BaseLayout,
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
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

type NavbarPath = '/films' | '/lists' | '/'
type NavbarName = 'Films' | 'Lists' | 'Home'

interface INavbarRoute {
  name: NavbarName
  component: Component
  path: NavbarPath
}

export const navbarRoutes: INavbarRoute[] = [
  {
    name: 'Films',
    component: BaseLayout,
    path: '/films',
  },
  {
    name: 'Lists',
    component: ListsView,
    path: '/lists',
  },
  {
    name: 'Home',
    component: HomeView,
    path: '/',
  },
]

// =================================
const userRoutes: VueRouter.RouteRecordRaw[] = [
  {
    path: '/auth/approved',
    component: AuthApprovedPage,
  },
  {
    path: '/profile',
    component: ProfilePage,
  },
  // {
  //   path: '/profile/favorite/movies',
  //   component:
  // }
]

// ==================================
const listRoutes: VueRouter.RouteRecordRaw[] = [
  {
    path: '/lists/new',
    component: NewList,
  },
  {
    path: '/profile/lists/:id',
    component: ListPage,
  },
]

export const profileNavbarRoutes: VueRouter.RouteRecordRaw[] = [
  {
    name: 'Favorites',
    path: '/profile/favorites/movies',
    component: ProfilePage,
  },
  {
    name: 'Rated',
    path: '/profile/rated/movies',
    component: ProfilePage,
  },
  {
    name: 'Watchlist',
    path: '/profile/watchlist/movies',
    component: ProfilePage,
  },
  {
    name: 'Lists',
    path: '/profile/lists',
    component: ProfilePage,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
    .concat(userRoutes)
    .concat(listRoutes)
    .concat(profileNavbarRoutes),
})

export default router
