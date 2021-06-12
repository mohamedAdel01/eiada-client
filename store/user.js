export const state = () => ({
  users: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0
  }
});

export const mutations = {
  save_users(state, [value, payload]) {
    state.users = value.users;
    state.pagination = { ...payload };
    state.pagination.total = value.total;
  },
  add_user(state, user) {
    state.users.push(user);
  }
};

export const actions = {
  async USER({ commit }, { service, response, payload }) {
    switch (service) {
      case "CREATE_USER":
        commit("add_user", response);
        break;
      case "USERS":
        commit("save_users", [response, payload]);
        break;
    }
  }
};
