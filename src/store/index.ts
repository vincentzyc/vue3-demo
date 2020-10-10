import { createStore } from 'vuex'

export default createStore({
  state: {
    selectAddress: null
  },
  mutations: {
    setSelectAddress(state, payload) {
      state.selectAddress = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
