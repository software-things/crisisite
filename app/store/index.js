import API from '../api/connectors/wordpress';

export const state = () => ({
  posts: [],
  mainMenu: null,
  footerMenu: null,
  wcag: {
    fontSize: 100,
    contrast: false,
    lineHeight: false,
    wordSpacing: false,
    letterSpacing: false,
  },
  breadcrumbs: [
    {
      href: '/',
      name: 'Strona startowa'
    },
    {
      href: '/',
      name: 'Komunikaty'
    }
  ]
})

export const actions = {
  async nuxtServerInit({ commit }) {
    let api = new API(this.$axios);
    const combinedData = await api.getCombinedData();
    commit('SET_POSTS', await api.getPosts(10));
    commit('SET_PAGES', await api.getPages());
    commit('SET_MAIN_MENU', combinedData['main-menu']);
    commit('SET_FOOTER_MENU', combinedData['footer-menu']);
    commit('SET_ADDITIONAL_DATA', combinedData['settings']);
  },
  async nuxtClientInit(vuex, app) {
    let api = new API(app.$axios);
    const combinedData = await api.getCombinedData();
    vuex.commit('SET_POSTS', await api.getPosts());
    vuex.commit('SET_PAGES', await api.getPages());
    vuex.commit('SET_MAIN_MENU', combinedData['main-menu']);
    vuex.commit('SET_FOOTER_MENU', combinedData['footer-menu']);
    vuex.commit('SET_ADDITIONAL_DATA', combinedData['settings']);
  }
}

export const mutations = {
  SET_POSTS(state, posts) {
    state.posts = posts
  },
  SET_PAGES(state, pages) {
    state.pages = pages
  },
  SET_MAIN_MENU(state, mainMenu) {
    state.mainMenu = mainMenu
  },
  SET_FOOTER_MENU(state, footerMenu) {
    state.footerMenu = footerMenu
  },
  SET_ADDITIONAL_DATA(state, additionalData) {
    state.additionalData = additionalData
  },
  BREADCRUMBS(state, status) {
    const breadcrumbs = [
      {
        href: '/',
        name: 'Strona startowa'
      }
    ]
    breadcrumbs.push(...status)
    state.breadcrumbs = breadcrumbs
  },
  SET_WCAG(state, param) {
    state.wcag[param.type] = param.value
  }
}

export const getters = {
  getAllPosts(state) {
    return state.posts
  },
  getAllPages(state) {
    return state.pages
  },
  getMainMenu(state) {
    return state.mainMenu
  },
  getFooterMenu(state) {
    return state.footerMenu
  },
  getAdditionalData(state) {
    return state.additionalData
  },
  getPostBySlug: (state) => (param) => {
    return state.posts.filter(el => {
      return el.slug === param
    })[0]
  },
  getPagesBySlug: (state) => (param) => {
    return state.pages.filter(el => {
      return el.slug === param
    })[0]
  }
}