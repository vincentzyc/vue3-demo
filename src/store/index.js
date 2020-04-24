import Vuex from 'vuex'

export default Vuex.createStore({
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
});