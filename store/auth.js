import authServices from "@/services/auth";

export const state = () => ({
  authData: null
});

export const mutations = {
  save_data(state, payload) {
    state.authData = payload;
    localStorage.setItem('authData', JSON.stringify(payload))
  }
};

export const actions = {
  async AUTH({ commit }, { service, payload }) {
    let apollo = this.app.apolloProvider.defaultClient;

    switch (service) {
      case "REGISER":
        let response = await authServices.REGISTER(apollo, payload);
        if (response.register.errors.length) {
          return response.register;
        }
        console.log("response", response);
        commit("save_data", response.register.user);
        return response.register.message;
        break;

      default:
        break;
    }
  }
};
