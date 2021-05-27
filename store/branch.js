export const mutations = {
  save_branch(state, payload) {
    let authData = this.$cookiz.get("authData");
    authData.branches = payload.branches;
    this.$cookiz.set("authData", JSON.stringify(authData));
  }
};

export const actions = {
  async BRANCH({ commit }, { service, response }) {
    switch (service) {
      case "CREATE_BRANCHES":
        commit("save_branch", response);
        break;
    }
  }
};
