export const mutations = {
  save_data(state, payload) {
    this.$cookiz.set("authData", JSON.stringify(payload));
  },
  edit_data(state, { key, value }) {
    let authData = this.$cookiz.get("authData");
    authData[key] = value;
    this.$cookiz.set("authData", JSON.stringify(authData));
  },
  clear_data() {
    this.$cookiz.removeAll();
  }
};

export const actions = {
  async AUTH({ commit }, { service, response }) {
    if (service == "LOGOUT") {
      // will be removed later
      commit("clear_data");
      return;
    }

    switch (service) {
      case "REGISTER":
      case "LOGIN":
        commit("save_data", response);
        break;

      case "VERIFY_EMAIL":
        commit("edit_data", {
          key: "email_verified",
          value: true
        });
        break;

      // case "LOGOUT":
      //   commit("clear_data");
      //   break;
    }
  }
};
