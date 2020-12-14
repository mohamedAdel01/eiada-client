import clinicServices from "@/services/clinic";

export const state = () => ({
  clinic: null
});

export const mutations = {
  save_clinic(state, payload) {
      console.log(payload)
    // this.$cookiz.set("authData", JSON.stringify(payload));
  }
};

export const actions = {
  async CLINIC({ commit }, { service, payload }) {
    let apollo = this.app.apolloProvider.defaultClient;
    let token = this.$cookiz.get("authData")
      ? this.$cookiz.get("authData").user.token
      : null;

    let response = (await clinicServices[service]({ apollo, token }, payload))
      .data[service];

    if (response.errors.length) {
      return {
        error: true,
        response
      };
    }

    switch (service) {
      case "CREATE_CLINIC":
        commit("save_clinic", response);
        break;

      default:
        break;
    }

    return {
      error: false,
      response
    };
  }
};
