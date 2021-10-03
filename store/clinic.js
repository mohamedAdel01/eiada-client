export const mutations = {
  save_clinic(state, payload) {
    let authData = this.$cookiz.get("authData");
    authData.clinic = [payload.clinic];
    this.$cookiz.set("authData", JSON.stringify(authData));
  }
};

export const actions = {
  async MAIN({ commit }, { service, response }) {
    switch (service) {
      case "CREATE_CLINIC":
        commit("save_clinic", response);
        break;
    }
  }
};
