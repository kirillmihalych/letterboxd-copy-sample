import { createRouter, createWebHistory } from 'vue-router'
import BaseLayout from '@/views/BaseLayout.vue'
import type { Component } from 'vue'
import MovieView from '@/views/MovieView.vue'
import FilmsView from '@/views/FilmsView.vue'
import AuthApprovedPage from '@/views/UserViews/AuthApprovedPage.vue'
import ProfilePage from '@/views/UserViews/ProfilePage.vue'
import ManageListView from '@/components/user-lists/ManageListView.vue'
import * as VueRouter from 'vue-router'
import PersonView from '@/views/Persons/PersonView.vue'
import MoviesView from '@/views/MoviesView.vue'
import PeopleView from '@/views/Persons/PeopleView.vue'

export const ROUTE_NAMES = {
  HOME: 'HOME',
  MOVIE_LIST: 'MOVIE_LIST',
  MOVIE: 'MOVIE',
  PEOPLE: 'PEOPLE',
  PERSON: 'PERSON',
} as const

export const ROUTE_PATHS = {
  HOME: '/',
  MOVIE_LIST: '/movies',
  MOVIE: '/movies/:id',
  PEOPLE: '/people',
  PERSON: '/persons/:id',
} as const

export const movieRoutes: VueRouter.RouteRecordRaw[] = [
  {
    name: ROUTE_NAMES.HOME,
    path: ROUTE_PATHS.HOME,
    component: BaseLayout,
  },
  {
    name: ROUTE_NAMES.MOVIE_LIST,
    path: ROUTE_PATHS.MOVIE_LIST,
    component: MoviesView,
  },
  {
    name: ROUTE_NAMES.MOVIE,
    path: ROUTE_PATHS.MOVIE,
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

export const peopleRoutes = [
  {
    name: ROUTE_NAMES.PEOPLE,
    path: ROUTE_PATHS.PEOPLE,
    component: PeopleView,
  },
  {
    name: ROUTE_NAMES.PERSON,
    path: ROUTE_PATHS.PERSON,
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
    .concat(peopleRoutes),
  scrollBehavior() {
    document.getElementById('app')?.scrollIntoView({ behavior: 'smooth' })
  },
})

export default router
