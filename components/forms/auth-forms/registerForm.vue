<template>
  <b-form @submit.prevent>
    <b-form-group :data-label="$t('Fullname')">
      <b-form-input
        v-model="$v.form.fullname.$model"
        class="py-4 bg-light border rounded"
        :placeholder="$t('Enter', { input: $t('Fullname') })"
        :state="$v.form.fullname.$model == null ? null : !$v.form.fullname.$error"
      ></b-form-input>
      <b-form-invalid-feedback v-if="!$v.form.fullname.required">{{
        $t("This field is required")
      }}</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group :data-label="$t('Email')">
      <b-form-input
        v-model="$v.form.email.$model"
        class="py-4 bg-light border rounded"
        :placeholder="$t('Enter', { input: $t('Email') })"
        :state="$v.form.email.$model == null ? null : !$v.form.email.$error"
      ></b-form-input>
      <b-form-invalid-feedback v-if="!$v.form.email.required">{{
        $t("This field is required")
      }}</b-form-invalid-feedback>
      <b-form-invalid-feedback v-if="!$v.form.email.email">{{
        $t("Please add a valid email")
      }}</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group :data-label="$t('Phone')">
      <b-form-input
        v-model="$v.form.phone.$model"
        class="py-4 bg-light border rounded"
        :placeholder="$t('Enter', { input: $t('Phone') })"
        :state="$v.form.phone.$model == null ? null : !$v.form.phone.$error"
      ></b-form-input>
      <b-form-invalid-feedback v-if="!$v.form.phone.required">{{
        $t("This field is required")
      }}</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group :data-label="$t('Password')">
      <b-form-input
        v-model="$v.form.password.$model"
        class="py-4 bg-light border rounded"
        :placeholder="$t('Enter', { input: $t('Password') })"
        :state="$v.form.password.$model == null ? null : !$v.form.password.$error"
      ></b-form-input>
      <b-form-invalid-feedback v-if="!$v.form.password.required">{{
        $t("This field is required")
      }}</b-form-invalid-feedback>
      <b-form-invalid-feedback
        v-if="$v.form.password.required && !$v.form.password.valid"
        >{{
          $t(
            "Password must contain capital letters, small letters, numbers and any special sign from these #?!@$%^&*-"
          )
        }}</b-form-invalid-feedback
      >
    </b-form-group>
    <b-form-group :data-label="$t('Confirm Password')">
      <b-form-input
        v-model="$v.form.confirmPassword.$model"
        class="py-4 bg-light border rounded"
        :placeholder="$t('Enter', { input: $t('Confirm Password') })"
        :state="
          $v.form.confirmPassword.$model == null ? null : !$v.form.confirmPassword.$error
        "
      ></b-form-input>
      <b-form-invalid-feedback v-if="!$v.form.confirmPassword.required">{{
        $t("This field is required")
      }}</b-form-invalid-feedback>
      <b-form-invalid-feedback
        v-if="$v.form.confirmPassword.required && !$v.form.confirmPassword.sameAsPassword"
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
        fullname: null,
        email: null,
        phone: null,
        password: null,
        confirmPassword: null,
      },
    };
  },
  methods: {
    register() {
      this.$v.$touch();
      if (this.$v.$invalid) return false;
      this.$store.dispatch("auth/test", this.form);
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
