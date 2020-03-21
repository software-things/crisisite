import API from '../api/connectors/wordpress';

export const state = () => ({
  posts: [],
  mainMenu: null,
  footerMenu: null,
  wcag: {
    fontSize: 100,
    contrast: false
  }
})

export const actions = {
  async nuxtServerInit({ commit }) {
    let api = new API(this.$axios);

    commit('SET_POSTS', await api.getPosts());
    commit('SET_PAGES', await api.getPages());
    commit('SET_MAIN_MENU', await api.getMainMenu());
    commit('SET_FOOTER_MENU', await api.getFooterMenu());
    commit('SET_ADDITIONAL_DATA', await api.getAdditionalData());
  }
}

export const mutations = {
	SET_POSTS (state, posts) {
		state.posts = posts
  },
	SET_PAGES (state, pages) {
		state.pages = pages
  },
	SET_MAIN_MENU (state, mainMenu) {
		state.mainMenu = mainMenu
  },
	SET_FOOTER_MENU (state, footerMenu) {
		state.footerMenu = footerMenu
  },
	SET_ADDITIONAL_DATA (state, additionalData) {
		state.additionalData = additionalData
  },
  FONT_SIZE (state, size) {
    state.wcag.fontSize = size
  },
  CONTRAST (state, status) {
    state.wcag.contrast = status
  }
}

export const getters = {
  getAllPosts (state) {
    return state.posts
  },
  getMainMenu(state) {
    return state.mainMenu
  },
  getFooterMenu (state) {
    return state.footerMenu
  },
  getAdditionalData (state) {
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