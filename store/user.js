export const state = () => ({
  users: null,
  pagination: null
});

export const mutations = {
  save_user_item(state, [ key, value, payload ]) {
    state[key] = value;
    state.pagination = payload
  }
};

export const actions = {
  async USER({ commit }, { service, payload }) {
    switch (service) {
      case "CREATE_USER":
        commit("save_user_item", ["users", response, payload]);
        break;
      case "USERS":
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
