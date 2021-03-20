import userServices from "@/services/user";

export const state = () => ({
  users: null
});

export const mutations = {
  save_user_item(state, { key, value }) {
    state[key] = value;
  }
};

export const actions = {
  async USER({ commit }, { service, payload }) {
    let apollo = this.app.apolloProvider.defaultClient;
    let token = this.$cookiz.get("authData")
      ? this.$cookiz.get("authData").user.token
      : null;

    let response = (await userServices[service]({ apollo, token }, payload))
      .data[service];

    if (response.errors && response.errors.length) {
      return {
        error: true,
        response
      };
    }

    switch (service) {
      case "CREATE_USER":
        commit("save_user_item", {
          key: "users",
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
