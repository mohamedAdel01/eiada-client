import { required, email, sameAs, minLength } from "vuelidate/lib/validators";

export const sidebar_items = [
  {
    route: "/app",
    name: "Dashboard",
  },
  {
    route: "/app/users",
    name: "Users",
  },
  {
    route: "/app/appointments",
    name: "Appointments",
  }
];

export const store_action_mixin = {
  methods: {
    STORE_ACTION(type, action, service, payload = null) {
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
        this.$toast.error(this.$t("Please fill all inputs with correct data"));
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

  if (role_name !== "custom") return validation;
  validation.form.new_role = {
    name: {
      required
    }
  };

  return validation;
};

export const login_validation = forget_password_form => {
  let validation = {
    form: {
      email: {
        required,
        email
      }
    }
  };

  if (!forget_password_form) validation.form.password = { required };
  return validation;
};

export const register_validation = () => {
  let validation_keys = ["fullname", "email", "phone"];
  let validation = create_validation_obj(validation_keys);

  validation.form.password = {
    required,
    // minLength: minLength(6),
    valid: function(value) {
      const containsUppercase = /[A-Z]/.test(value);
      const containsLowercase = /[a-z]/.test(value);
      const containsNumber = /[0-9]/.test(value);
      const containsSpecial = /[#?!@$%^&*-]/.test(value);
      return (
        containsUppercase &&
        containsLowercase &&
        containsNumber &&
        containsSpecial
      );
    }
  };

  validation.form.confirmPassword = {
    required,
    sameAsPassword: sameAs("password")
  };

  return validation;
};

export const change_password_validation = () => {
  let validation = {
    form: {
      new_password: {
        required,
        // minLength: minLength(6),
        valid: function(value) {
          const containsUppercase = /[A-Z]/.test(value);
          const containsLowercase = /[a-z]/.test(value);
          const containsNumber = /[0-9]/.test(value);
          const containsSpecial = /[#?!@$%^&*-]/.test(value);
          return (
            containsUppercase &&
            containsLowercase &&
            containsNumber &&
            containsSpecial
          );
        }
      }
    }
  };

  return validation;
};

export const add_clinic_validation = {
  form: {
    name: {
      required
    }
  }
};

export const add_branch_validation = {
  form: {
    addresses: {
      minLength: minLength(1),
      $each: {
        address: {
          required
        }
      }
    }
  }
};
