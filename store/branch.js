import branchServices from "@/services/branch";

export const mutations = {
  save_branch(state, payload) {
    let authData = this.$cookiz.get("authData");
    authData.branches = payload.branches;
    this.$cookiz.set("authData", JSON.stringify(authData));
  }
};

export const actions = {
  async BRANCH({ commit }, { service, payload }) {
    let apollo = this.app.apolloProvider.defaultClient;
    let token = this.$cookiz.get("authData")
      ? this.$cookiz.get("authData").user.token
      : null;

    let response = (await branchServices[service]({ apollo, token }, payload))
      .data[service];

    if (response.errors.length) {
      return {
        error: true,
        response
      };
    }

    switch (service) {
      case "CREATE_BRANCHES":
        commit("save_branch", response);
        break;

      default:
        break;
    }

    return {
      error: false,
      response
    };
  }
};
