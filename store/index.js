import SERVICE from "@/services";

export const state = () => ({
  loading: false,
  response_errors: null
});

export const mutations = {
  loading(state, value) {
    state.loading = value;
    if (value) state.response_errors = false;
  },
  error(state, error) {
    state.response_errors = error;
    state.loading = false
  }
};

export const actions = {
  async HANDLE_REQUEST(
    { commit, dispatch },
    { type, action, service, payload }
  ) {
    commit("loading", "service");

    let apollo = this.app.apolloProvider.defaultClient;
    let token = this.$cookiz.get("authData")
      ? this.$cookiz.get("authData").user.token
      : null;

    let response = (await SERVICE[type]({ apollo, token, service, payload }))
      .data[service];

    if (response.errors.length) {
      commit("error", response.errors[0]);
      return {
        error: true
      };
    }

    dispatch(action, { service, response });

    commit("loading", false);

    return {
      error: false,
      response
    };
  }
};
