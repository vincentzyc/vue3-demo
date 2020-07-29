import { createStore } from 'vuex'

export default createStore({
  state: {
    storeTest: 'hello world'
  },
  mutations: {
    setStoreTest(state, value) {
      state.storeTest = value
    }
  },
  actions: {
  },
  modules: {
  }
})
