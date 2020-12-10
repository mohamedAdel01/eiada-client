import authServices from "@/services/auth";

export const state = () => ({
  authData: null
});

export const mutations = {
  save_data(state, payload) {
    state.authData = payload;
    localStorage.setItem("authData", JSON.stringify(payload));
  }
};

export const actions = {
  async AUTH({ commit }, { service, payload }) {
    let apollo = this.app.apolloProvider.defaultClient;

    switch (service) {
      case "REGISTER":
        let response = (await authServices.REGISTER(apollo, payload)).data
          .Register;
        if (response.errors.length) {
          return {
            error: true,
            response
          };
        }
        commit("save_data", response.user);
        return {
          error: false,
          response
        };
        break;

      default:
        break;
    }
  }
};
