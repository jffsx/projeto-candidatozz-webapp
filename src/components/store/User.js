
const state = {
  authUser: null
}

const mutations = {
  SET_AUTH_USER (state, user) {
    window.localStorage.setItem('authUser', JSON.stringify(user))
    state.authUser = user
  },
  CLEAR_AUTH_USER (state) {
    state.authUser = null
    window.localStorage.removeItem('authUser')
    window.localStorage.clear()
  }
}

const actions = {
  setUser: ({commit}, user) => {
    commit('SET_AUTH_USER', user)
  },
  clearUser: ({commit}) => {
    commit('CLEAR_AUTH_USER')
  }
}

export default {
  state, mutations, actions
}
