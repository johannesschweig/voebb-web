import Vue from 'vue'
import Router from 'vue-router'
import BookmarksPage from './components/BookmarksPage.vue'
import Copies from './components/Copies.vue'
import Details from './components/Details.vue'
import Preview from './components/Preview.vue'
import SearchPage from './components/SearchPage.vue'
import SettingsPage from './components/SettingsPage.vue'
import Wrapper from './components/Wrapper.vue'
import { PAGE, SETTINGS_PAGE, PREVIEW, SEARCH_WRAPPER, BOOKMARKS_WRAPPER, DETAILS, COPIES } from './utils/constants'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/' + SEARCH_WRAPPER,
      component: Wrapper,
      redirect: '/' + SEARCH_WRAPPER + '/' + PAGE,
      children: [
        {
          path: PAGE,
          component: SearchPage
        },
        {
          path: PREVIEW,
          component: Preview,
          redirect: '/' + SEARCH_WRAPPER + '/' + PREVIEW + '/' + DETAILS,
          children: [
            {
              path: DETAILS,
              component: Details
            },
            {
              path: COPIES,
              component: Copies
            }
          ]
        }
      ]
    },
    {
      path: '/' + BOOKMARKS_WRAPPER,
      component: Wrapper,
      redirect: '/' + BOOKMARKS_WRAPPER + '/' + PAGE,
      children: [
        {
          path: PAGE,
          component: BookmarksPage
        },
        {
          path: PREVIEW,
          component: Preview,
          redirect: '/' + BOOKMARKS_WRAPPER + '/' + PREVIEW + '/' + DETAILS,
          children: [
            {
              path: DETAILS,
              component: Details
            },
            {
              path: COPIES,
              component: Copies
            }
          ]
        }
      ]
    },
    {
      path: '/' + SETTINGS_PAGE,
      component: SettingsPage
    },
    {
      path: '/',
      redirect: '/' + SEARCH_WRAPPER + '/' + PAGE
    }
  ]
})
