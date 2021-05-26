import { required, email } from "vuelidate/lib/validators";

export const store_action_mixin = {
  methods: {
    STORE_ACTION(type, action, service, payload) {
      return this.$store.dispatch("HANDLE_REQUEST", {
        type,
        action,
        service,
        payload
      });
    }
  }
};

export const check_errors_mixin = {
  methods: {
    CHECK_FORM_ERROR() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        this.$toast.info(this.$t("Please fill all inputs with correct data"));
        return false;
      }
      return true;
    }
  }
};

const create_validation_obj = validation_keys => {
  let validation = {
    form: {}
  };

  validation_keys.forEach(key => {
    if (key == "email") validation.form[key] = { required, email };
    else validation.form[key] = { required };
  });

  return validation;
};

export const add_user_validation = role_name => {
  let validation_keys = ["branch_id", "email", "jop_title", "role_name"];
  let validation = create_validation_obj(validation_keys);

  if (role_name != "custom") return validation;
  validation.form["new_role"] = {
    name: {
      required
    }
  };

  return validation;
};
