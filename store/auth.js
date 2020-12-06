export const state = () => ({
    user: null
  })
  
  export const mutations = {
    test(state, payload) {
        console.log('ppppp',payload)   
        console.log('koooooo',state)   
    }
  }

  export const actions = {
    test ({ commit }, req) {
        console.log(req)
        commit('test', 'looooo')
    }
  }