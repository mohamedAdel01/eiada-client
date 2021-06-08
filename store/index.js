import SERVICE from "~/types_grqphql";

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
    state.loading = false;
  }
};

export const actions = {
  async HANDLE_REQUEST(
    { commit, dispatch },
    { type, action, service, payload }
  ) {
    try {
      commit("loading", service);

      let apollo = this.app.apolloProvider.defaultClient;
      let token = this.$cookiz.get("authData")
        ? this.$cookiz.get("authData").user.token
        : null;

      let response = (await SERVICE[type]({ apollo, token, service, payload }))
        .data[service];

      if (response.errors && response.errors.length) {
        commit("error", response.errors[0]);
        return {
          error: true,
          response
        };
      }

      dispatch(action, { service, response, payload });

      commit("loading", false);

      return {
        error: false,
        response
      };
    } catch (error) {
      commit("loading", false);
      console.log(error);
      throw error.networkError.result.errors[0].message;
    }
  }
};
