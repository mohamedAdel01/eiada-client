import authServices from "@/services/auth";

export const state = () => ({
  user: null
});

export const mutations = {
  test(state, payload) {
    console.log("ppppp", payload);
    console.log("koooooo", state);
  }
};

export const actions = {
  async AUTH({ commit }, { service, payload }) {
    let apollo = this.app.apolloProvider.defaultClient;
    switch (service) {
      case "REGISER":
        let response =  await authServices.REGISTER(apollo, payload);
        if(response.register.errors.length) {
          return response.register
        }
        commit('save_data', response)
        break;

      default:
        break;
    }
  }
};
