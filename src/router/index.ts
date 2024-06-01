import { createRouter, createWebHistory } from 'vue-router'
import BaseLayout from '@/views/BaseLayout.vue'
import HomeView from '@/views/HomeView.vue'
import type { Component } from 'vue'
import MovieView from '@/views/MovieView.vue'
import FilmsView from '@/views/FilmsView.vue'
import AuthApprovedPage from '@/views/UserViews/AuthApprovedPage.vue'
import ProfilePage from '@/views/UserViews/ProfilePage.vue'
import ManageListView from '@/components/user-lists/ManageListView.vue'
import * as VueRouter from 'vue-router'
import PersonView from '@/views/Persons/PersonView.vue'

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

export const movieRoutes: VueRouter.RouteRecordRaw[] = [
  {
    path: '/',
    component: BaseLayout,
  },
  {
    name: 'films',
    path: '/base-layout',
    component: BaseLayout,
  },
  {
    path: '/movies/movie_page/:id',
    component: MovieView,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

type NavbarPath = '/base-layout' | '/lists' | '/'
type NavbarName = 'Main' | 'Lists' | 'Home'

interface INavbarRoute {
  name: NavbarName
  component: Component
  path: NavbarPath
}

export const navbarRoutes: INavbarRoute[] = [
  {
    name: 'Home',
    component: BaseLayout,
    path: '/',
  },
  {
    name: 'Main',
    component: BaseLayout,
    path: '/base-layout',
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
]

// ==================================
const listRoutes: VueRouter.RouteRecordRaw[] = [
  {
    name: 'create',
    path: '/profile/lists/create',
    component: ManageListView,
  },
  {
    path: '/profile/lists/:id',
    component: ManageListView,
  },
]

export const profileRoutes: VueRouter.RouteRecordRaw[] = [
  {
    name: 'Favorites',
    path: '/profile/:id/favorites/movies',
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
  {
    name: 'Create new list',
    path: '/profile/lists/create',
    component: ManageListView,
  },
]

export const filterMoviesRoutes: VueRouter.RouteRecordRaw[] = [
  {
    name: 'Popularity',
    path: '/films/popular',
    component: FilmsView,
  },
  {
    name: 'Upcoming release',
    path: '/films/upcoming',
    component: FilmsView,
  },
  {
    name: 'Top rating',
    path: '/films/top_rated',
    component: FilmsView,
  },
]

export const personRoutes = [
  {
    name: 'Person',
    path: '/persons/:id',
    component: PersonView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: movieRoutes
    .concat(userRoutes)
    .concat(listRoutes)
    .concat(profileRoutes)
    .concat(filterMoviesRoutes)
    .concat(personRoutes),
})

export default router
