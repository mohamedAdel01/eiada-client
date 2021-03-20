import { required, email } from "vuelidate/lib/validators";

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

  console.log(validation);
  return validation;
};
