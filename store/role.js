export const state = () => ({
  roles: []
});

export const mutations = {
  save_role_item(state, { key, value }) {
    state[key] = value;
  }
};

export const actions = {
  async MAIN({ commit }, { service, response }) {
    switch (service) {
      case "ROLES":
        commit("save_role_item", {
          key: "roles",
          value: response
        });
        break;
    }
  }
};
