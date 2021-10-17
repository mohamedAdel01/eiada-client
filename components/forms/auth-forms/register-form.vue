<template>
  <b-form @submit.prevent>
    <b-form-group class="px-2" :data-label="$t('Fullname')">
      <b-form-input
        v-model="$v.form.name.$model"
        class="py-4 border rounded"
        :placeholder="$t('Enter', { input: $t('Fullname') })"
        :state="$v.form.name.$dirty ? !$v.form.name.$error : null"
      ></b-form-input>
      <b-form-invalid-feedback v-show="!$v.form.name.required">{{
        $t("This field is required")
      }}</b-form-invalid-feedback>
    </b-form-group>

    <b-form-group class="px-2" :data-label="$t('Email')">
      <b-form-input
        v-model="$v.form.email.$model"
        class="py-4 border rounded"
        :placeholder="$t('Enter', { input: $t('Email') })"
        :state="
          response_errors && response_errors.key == 'email'
            ? false
            : $v.form.email.$dirty
            ? !$v.form.email.$error
            : null
        "
      ></b-form-input>
      <b-form-invalid-feedback v-show="!$v.form.email.required">{{
        $t("This field is required")
      }}</b-form-invalid-feedback>
      <b-form-invalid-feedback v-show="!$v.form.email.email">{{
        $t("Please add a valid email")
      }}</b-form-invalid-feedback>
      <b-form-invalid-feedback
        class="d-block"
        v-if="response_errors && response_errors.key == 'email'"
        >{{ $t(response_errors.message) }}</b-form-invalid-feedback
      >
    </b-form-group>

    <b-form-group class="px-2" :data-label="$t('Phone')">
      <b-form-input
        v-model="$v.form.phone.$model"
        class="py-4 border rounded"
        :placeholder="$t('Enter', { input: $t('Phone') })"
        :state="
          response_errors && response_errors.key == 'phone'
            ? false
            : $v.form.phone.$dirty
            ? !$v.form.phone.$error
            : null
        "
      ></b-form-input>
      <b-form-invalid-feedback v-show="!$v.form.phone.required">{{
        $t("This field is required")
      }}</b-form-invalid-feedback>
      <b-form-invalid-feedback
        class="d-block"
        v-if="response_errors && response_errors.key == 'phone'"
        >{{ $t(response_errors.message) }}</b-form-invalid-feedback
      >
    </b-form-group>

    <b-form-group class="position-relative px-2" :data-label="$t('Password')">
      <div class="eye" v-show="form.password">
        <inline-svg
          v-show="!showPassword"
          @click="showPassword = true"
          fill="#aaa"
          :src="require('@/static/images/hide-password.svg')"
        ></inline-svg>
        <inline-svg
          v-show="showPassword"
          @click="showPassword = false"
          fill="#aaa"
          :src="require('@/static/images/show-password.svg')"
        ></inline-svg>
      </div>
      <b-form-input
        :type="showPassword ? 'text' : 'password'"
        v-model="$v.form.password.$model"
        class="py-4 border rounded"
        :placeholder="$t('Enter', { input: $t('Password') })"
        :state="$v.form.password.$dirty ? !$v.form.password.$error : null"
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

    <b-form-group class="px-2" :data-label="$t('Confirm Password')">
      <b-form-input
        type="password"
        v-model="$v.form.confirmPassword.$model"
        class="py-4 border rounded"
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

    <div class="px-2">
      <button
        class="btn btn-dark rounded btn-block py-2"
        :disabled="loading"
        @click="register"
      >
        <span v-show="!loading">
          {{ $t("Submit") }}
        </span>
        <span v-show="loading">
          {{ $t("...Loading") }}
          <b-spinner small variant="white" label="Spinning"></b-spinner>
        </span>
      </button>
    </div>
  </b-form>
</template>

<script>
import {
  store_action_mixin,
  check_errors_mixin,
  register_validation,
} from "@/assets/js/constants";
export default {
  mixins: [store_action_mixin, check_errors_mixin],
  data() {
    return {
      form: {
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      },
      showPassword: false,
    };
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    response_errors() {
      return this.$store.state.response_errors;
    },
  },
  methods: {
    register() {
      if (!this.CHECK_FORM_ERROR()) return;
      this.STORE_ACTION("MUTATION", "auth/MAIN", "REGISTER", this.form).then(
        ({ error }) => {
          if (error) return;

          this.$emit("success");
        }
      );
    },
  },
  validations() {
    return register_validation();
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
