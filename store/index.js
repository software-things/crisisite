import API from '../api/connectors/wordpress';

export const state = () => ({
  posts: [],
  mainMenu: null,
  footerMenu: null
})

export const actions = {
  async nuxtServerInit({ commit }) {
    let api = new API(this.$axios);

    commit('SET_POSTS', await api.getPosts());
    commit('SET_MAIN_MENU', await api.getMainMenu());
    commit('SET_FOOTER_MENU', await api.getFooterMenu());
    commit('SET_ADDITIONAL_DATA', await api.getAdditionalData());
  }
}

export const mutations = {
	SET_POSTS (state, posts) {
		state.posts = posts
  },
	SET_MAIN_MENU (state, mainMenu) {
		state.mainMenu = mainMenu
  },
	SET_FOOTER_MENU (state, footerMenu) {
		state.footerMenu = footerMenu
  },
	SET_ADDITIONAL_DATA (state, additionalData) {
		state.additionalData = additionalData
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
  }
}