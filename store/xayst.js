import Vuex from 'vuex'
import axios from 'axios'

const createXayStore = () => {
  return new Vuex.Store({
    state: {
      getDataXay: [],
    },
    mutations: {
      setXayPostState(state, gdata) {
        state.getDataXay = gdata
      },
    },
    actions: {
      nuxtServerInit(vuexcontext, context) {
        return axios
          .get('/msgnpps')
          .then((res) => {
            const data = []
            for (const key in res.data) {
              data.push({ ...res.data[key], id: key })
            }
            vuexcontext.commit('setXayPostState', data)
          })
          .catch((e) => {
            context.error(e)
          })
      },
    },
    getters: {
      getXayAllPosts(state) {
        return state.getDataXay
      },
    },
  })
}

export default createXayStore
