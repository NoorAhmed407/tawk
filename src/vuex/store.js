import { createStore } from 'vuex'

// Create a new store instance.
export const store = createStore({
  state () {
    return {
      cityData: null
    }
  },
  mutations: {
    updateCity (state, payload) {
      state.cityData = payload;
    }
  }
});