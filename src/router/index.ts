import { createRouter, createWebHistory } from 'vue-router'
import FilmsView from '@/views/FilmsView.vue'
import ListsView from '@/views/ListsView.vue'
import ErrorView from '@/views/ErrorView.vue'
import StartView from '@/views/StartView.vue'
import type { Component } from 'vue'
import SingleFilmView from '@/views/SingleFilmView.vue'

type Path =
  | '/films'
  | '/lists'
  | '/:pathMatch(.*)*'
  | '/'
  | '/films/:id'
  | 'fimls/:id/cast'

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
    path: '/films/:id',
    component: SingleFilmView,
  },
  {
    path: '/lists',
    component: ListsView,
  },
  {
    path: '/:pathMatch(.*)*',
    component: ErrorView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
