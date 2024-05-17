<template>
  <div class="profile-page-container">
    <UserInfo @load="(id) => setAccountId(id)" />
    <ProfileNavbar />
    <PaginatedList
      :isLoading="isLoading"
      :error="error"
      :movies="movies"
      :lists="lists"
      :total_pages="total_pages"
      :total_results="total_results"
      @set-next-page="(new_page) => setPage(new_page)"
      @set-prev-page="(new_page) => setPage(new_page)"
      @set-this-page="(new_page) => setPage(new_page)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import type { IRatedMovie } from '@/interfaces/account-types'
import type { IMovie } from '@/interfaces/movie-types'
import getFavoritesMovies from '@/api/account/getFavorites'
import getWatchlistMovies from '@/api/account/getWatchlist'
import type { IList } from '@/interfaces/lists-types'
import getLists from '@/api/account/getLists'
import getRatedMovies from '@/api/account/getRatedMovies'
import UserInfo from './UserInfo.vue'
import ProfileNavbar from './ProfileNavbar.vue'
import PaginatedList from '@/components/paginated-list/PaginatedList.vue'
// ========================================================
// [__] Я хочу уметь искать фильмы
// [__] Какие это конкретное действия?
// 1) Это поиск,если я собираюсь искать, что-то, о чём я уже знаю.
// [__] Добавить logout
// [__] Сделать валидацию для поиска
// [__] В dropdown заменить отсутсвующие имеджи на какой-то placeholder
// 2) Это страница фильтров, если я собираюсь исследовать фильмы и найти для себя что-то новое: популярные сейчас фильмы, скоро в кино, самый большой рейтинг. Самому указать жанры, минимальное количество голосов,
// [__] убрать sort_by, потому что он уже есть в Browse_by
// [__] искать фильмы по году и по декадам.
// [__] Я хочу отслеживать фильмы, что я посмотрел и оценивать их
// [__] Сохранять фильмы, что хочу посмотреть.
// [x] ВАЖНОСТЬ 5. В карте фильма, настроить синхронизацию рейтинга. Когда, я ставлю оценку в upcomings, она отображается в интерфейсе, но не проходит на сервер. Это серьёзная ошибка, которую нужно устранить. Чётко выяснить для себя, почему это происходит и как, мне это избежать в будущем.
// [__] Создать переиспользуемый ImageContainer, чтобы отображать загрузку изображения и ставить placeholder, если изображение отсутствует. Кроме данных о изображении, контейнер должен динамически принимать CSS параметры для изображение, чтобы layout приложение можно было настраивать.
// [__] Создавать свои листы и делиться ими с друзьями.
// [__] Добавить все CRUD операции с листами на страницу профиля
// [__] Добавить кнопку создать лист, в модалку к FilmCard, что перекидывает на страницу создания листа.
// [__] Добавить на индивидуальную страницу фильма все взаимодействия с фильмом (тагл фаворит, тагл фотчлист, тагл в кастомный лист)
// [__] Добавить возможность делиться листом
// ========================================================
// [__] Отладить макет
// ============================================
// [__] Сразу думать о переиспользуемости кода, потмоу что никогда не знаешь, понадобиться ли переиспользовать что-то, а иметь такую возможность часто хочется
// [__] Организовывать папки по принадлежности к части интерфейса, чтобы когда на пользовательском уровне была обнаружена ошибка, не слишком долго думать, где же это место в коде
// [__] Писать человеко-читаемые названия
// ============================================
// [__] Повторить мои записи курса. Что я упустил?

const account_id = ref<number | null>(null)
const setAccountId = (id: number) => {
  account_id.value = id
}

const route = useRoute()
const movies = ref<IRatedMovie[] | IMovie[] | null>()
const lists = ref<IList[] | null>(null)
const error = ref<string | null>(null)
const isLoading = ref(false)
const page = ref(1)
const setPage = (new_page: number) => {
  page.value = new_page
}
const total_pages = ref(1)
const total_results = ref(1)

const fetchList = async (route_name: string, page_value: number) => {
  let response = null
  isLoading.value = true
  error.value = null
  movies.value = null
  lists.value = null
  try {
    if (route_name.toLowerCase() === 'favorites') {
      response = await getFavoritesMovies(page_value)
      movies.value = response.results
      total_pages.value = response.total_pages
      total_results.value = response.total_results
    }
    if (route_name.toLowerCase() === 'watchlist') {
      response = await getWatchlistMovies(page_value)
      movies.value = response.results
      total_pages.value = response.total_pages
      total_results.value = response.total_results
    }
    if (route_name.toLowerCase() === 'lists') {
      response = await getLists()
      lists.value = response.results
      total_pages.value = response.total_pages
      total_results.value = response.total_results
    }
    if (route_name.toLowerCase() === 'rated') {
      response = await getRatedMovies(page_value)
      movies.value = response.results
      total_pages.value = response.total_pages
      total_results.value = response.total_results
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value =
        err.message.toString() + '. ' + 'Probably, your vpn is turned off.'
    }
  } finally {
    isLoading.value = false
  }
}

watchEffect(() => {
  if (route.name || page.value) {
    fetchList(route.name as string, page.value)
  }
})
</script>

<style scoped>
.profile-page-container {
  box-sizing: border-box;
  width: 950px;
}
</style>
