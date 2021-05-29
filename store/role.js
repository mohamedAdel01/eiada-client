import roleServices from "@/types_grqphql/role";

export const state = () => ({
  roles: null
});

export const mutations = {
  save_role_item(state, { key, value }) {
    state[key] = value;
  }
};

export const actions = {
  async ROLE({ commit }, { service, payload }) {
    let apollo = this.app.apolloProvider.defaultClient;
    let token = this.$cookiz.get("authData")
      ? this.$cookiz.get("authData").user.token
      : null;

    let response = (await roleServices[service]({ apollo, token }, payload))
      .data[service];

    if (response.errors && response.errors.length) {
      return {
        error: true,
        response
      };
    }

    switch (service) {
      case "ROLES":
        commit("save_role_item", {
          key: "roles",
          value: response
        });
        break;
    }

    return {
      error: false,
      response
    };
  }
};
