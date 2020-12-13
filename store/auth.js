import authServices from "@/services/auth";

export const mutations = {
  save_data(state, payload) {
    this.$cookiz.set("authData", JSON.stringify(payload));
  },
  edit_data(state, { key, value }) {
    let authData = this.$cookiz.get("authData");
    authData[key] = value;
    console.log(authData);
    this.$cookiz.set("authData", JSON.stringify(authData));
  },
  clear_data(state) {
    this.$cookiz.removeAll();
  }
};

export const actions = {
  async AUTH({ commit }, { service, payload }) {
    let response;
    let apollo = this.app.apolloProvider.defaultClient;
    let token = this.$cookiz.get("authData")
      ? this.$cookiz.get("authData").token
      : null;

    switch (service) {
      case "REGISTER":
        response = (await authServices.REGISTER({ apollo }, payload)).data
          .Register;
        if (response.errors.length) {
          return {
            error: true,
            response
          };
        }
        commit("save_data", response.user);
        return {
          error: false,
          response
        };
        break;

      case "VERIFY_EMAIL":
        response = (await authServices.VERIFY_EMAIL({ apollo }, payload)).data
          .Verify_Email;
        if (response.errors.length) {
          return {
            error: true,
            response
          };
        }
        commit("edit_data", {
          key: "email_verified",
          value: true
        });
        return {
          error: false,
          response
        };
        break;

      case "RESEND_VERIFICATION_EMAIL":
        response = (
          await authServices.RESEND_VERIFICATION_EMAIL({ apollo, token })
        ).data.Resend_Verification_Email;
        if (response.errors.length) {
          return {
            error: true,
            response
          };
        }
        return {
          error: false,
          response
        };
        break;

      case "LOGIN":
        response = (await authServices.LOGIN({ apollo }, payload)).data.Login;
        if (response.errors.length) {
          return {
            error: true,
            response
          };
        }
        commit("save_data", response.user);
        return {
          error: false,
          response
        };
        break;

      case "LOGOUT":
        commit("clear_data");
        break;

      default:
        break;
    }
  }
};
