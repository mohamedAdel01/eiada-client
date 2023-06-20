export const state = () => ({
  bookings: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0
  }
});

export const mutations = {
  save_bookings(state, [value]) {
    state.bookings = value.bookings;
  },
  add_booking(state, user) {
    state.users.push(user);
  }
};

export const actions = {
  async MAIN({ commit }, { service, response, payload }) {
    switch (service) {
      case "CREATE_BOOKING":
        commit("add_booking", response.user);
        break;
      case "BOOKINGS":
        commit("save_bookings", [response, payload]);
        break;
    }
  }
};
