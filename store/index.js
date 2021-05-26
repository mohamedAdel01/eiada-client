import SERVICE from "@/services";

export const state = () => ({
  loading: false
});

export const mutations = {
  loading({ loading }, value) {
    loading = value;
  },
  clear_data() {
    this.$cookiz.removeAll();
  }
};

export const actions = {
  async HANDLE_REQUEST(
    { commit, dispatch },
    { type, action, service, payload }
  ) {
    if (service == "LOGOUT") {
      // will be removed later
      commit("clear_data");
      return;
    }

    commit("loading", "service");

    let apollo = this.app.apolloProvider.defaultClient;
    let token = this.$cookiz.get("authData")
      ? this.$cookiz.get("authData").user.token
      : null;

    let response = (await SERVICE[type]({ apollo, token, service, payload }))
      .data[service];

    if (response.errors.length) {
      return {
        error: true,
        response
      };
    }

    commit("loading", false);

    return dispatch(action, { service, response });
  }
};
