<template>
  <b-form @submit.prevent>
    <b-form-group :data-label="$t('Fullname')">
      <b-form-input
        v-model="$v.form.fullname.$model"
        class="py-4 bg-light border rounded"
        :placeholder="$t('Enter', { input: $t('Fullname') })"
        :state="$v.form.fullname.$dirty ? !$v.form.fullname.$error : null"
      ></b-form-input>
      <b-form-invalid-feedback v-show="!$v.form.fullname.required">{{
        $t("This field is required")
      }}</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group :data-label="$t('Email')">
      <b-form-input
        v-model="$v.form.email.$model"
        class="py-4 bg-light border rounded"
        :placeholder="$t('Enter', { input: $t('Email') })"
        :state="$v.form.email.$dirty ? !$v.form.email.$error : null"
      ></b-form-input>
      <b-form-invalid-feedback v-show="!$v.form.email.required">{{
        $t("This field is required")
      }}</b-form-invalid-feedback>
      <b-form-invalid-feedback v-show="!$v.form.email.email">{{
        $t("Please add a valid email")
      }}</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group :data-label="$t('Phone')">
      <b-form-input
        v-model="$v.form.phone.$model"
        class="py-4 bg-light border rounded"
        :placeholder="$t('Enter', { input: $t('Phone') })"
        :state="$v.form.phone.$dirty ? !$v.form.phone.$error : null"
      ></b-form-input>
      <b-form-invalid-feedback v-show="!$v.form.phone.required">{{
        $t("This field is required")
      }}</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group class="position-relative" :data-label="$t('Password')">
      <div class="eye" v-show="form.password">
        <img
          v-show="!showPassword"
          @click="showPassword = true"
          src="@/static/images/hide-password.svg"
        />
        <img
          v-show="showPassword"
          @click="showPassword = false"
          src="@/static/images/show-password.svg"
        />
      </div>
      <b-form-input
        :type="showPassword ? 'text' : 'password'"
        v-model="$v.form.password.$model"
        class="py-4 bg-light border rounded"
        :placeholder="$t('Enter', { input: $t('Password') })"
        :state="$v.form.password.$dirty ? !$v.form.password.$error : null"
      ></b-form-input>
      <b-form-invalid-feedback v-show="!$v.form.password.required">{{
        $t("This field is required")
      }}</b-form-invalid-feedback>
      <b-form-invalid-feedback
        v-show="$v.form.password.required && !$v.form.password.valid"
        >{{
          $t(
            "Password must contain capital letters, small letters, numbers and any special sign from these #?!@$%^&*-"
          )
        }}</b-form-invalid-feedback
      >
    </b-form-group>
    <b-form-group :data-label="$t('Confirm Password')">
      <b-form-input
        type="password"
        v-model="$v.form.confirmPassword.$model"
        class="py-4 bg-light border rounded"
        :placeholder="$t('Enter', { input: $t('Confirm Password') })"
        :state="$v.form.confirmPassword.$dirty ? !$v.form.confirmPassword.$error : null"
      ></b-form-input>
      <b-form-invalid-feedback v-show="!$v.form.confirmPassword.required">{{
        $t("This field is required")
      }}</b-form-invalid-feedback>
      <b-form-invalid-feedback
        v-show="
          $v.form.confirmPassword.required && !$v.form.confirmPassword.sameAsPassword
        "
        >{{ $t("Passwords must match") }}</b-form-invalid-feedback
      >
    </b-form-group>

    <button class="btn btn-info btn-block py-2" @click="register">
      {{ $t("Submit") }}
    </button>
  </b-form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, sameAs, email, minLength } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        fullname: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      },
      showPassword: false,
    };
  },
  methods: {
    register() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        this.$toast.info(this.$t("Please fill all inputs with correct data"));
        return false;
      }
      this.$store
        .dispatch("auth/AUTH", {
          service: "REGISTER",
          payload: this.form,
        })
        .then((res) => {
          // this.$router.push("/auth/verify-email");
        })
        .catch((error) => {
          console.log("kkoooo", error);
        });
    },
  },
  validations: {
    form: {
      fullname: {
        required,
      },
      email: {
        required,
        email,
      },
      phone: {
        required,
      },
      password: {
        required,
        minLength: minLength(8),
        valid: function (value) {
          const containsUppercase = /[A-Z]/.test(value);
          const containsLowercase = /[a-z]/.test(value);
          const containsNumber = /[0-9]/.test(value);
          const containsSpecial = /[#?!@$%^&*-]/.test(value);
          return (
            containsUppercase && containsLowercase && containsNumber && containsSpecial
          );
        },
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs("password"),
      },
    },
  },
};
</script>

<style lang="scss">
.eye {
  position: absolute;
  width: 25px;
  height: 25px;
  top: 10px;
  right: -35px;
  img {
    cursor: pointer;
    width: 100%;
  }
}
</style>
