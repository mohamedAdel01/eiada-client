import SERVICE from "@/services";

export const state = () => ({
  loading: false,
  response_errors: false
});

export const mutations = {
  loading({ loading }, value) {
    loading = value;
  },
  error({ response_errors }, value) {
    response_errors = value.errors[0];
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
      commit("error", response);
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
