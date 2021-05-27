<template>
  <b-form @submit.prevent>
    <b-form-group class="px-2" :data-label="$t('Email')">
      <b-form-input
        v-model="$v.form.email.$model"
        class="py-4 border rounded"
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

    <b-form-group
      class="position-relative px-2 mb-1"
      v-if="!forgetPasswordForm"
      :data-label="$t('Password')"
    >
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
      <b-form-invalid-feedback v-show="!$v.form.password.required">{{
        $t("This field is required")
      }}</b-form-invalid-feedback>
    </b-form-group>

    <div class="text-right">
      <button
        type="button"
        class="forget-password btn btn-link bg-white pt-0"
        @click="forgetPasswordForm = !forgetPasswordForm"
      >
        <span v-show="!forgetPasswordForm">
          {{ $t("Forget password") }}
        </span>
        <span v-show="forgetPasswordForm">
          {{ $t("Return to login") }}
        </span>
      </button>
    </div>
    <div
      v-if="response_errors"
      class="border border-danger rounded-lg p-3 bg-white mx-2 mt-3 text-center"
    >
      <p>{{ response_errors.message }}</p>
    </div>

    <div class="px-2">
      <button
        class="btn btn-dark rounded btn-block py-2 mt-4"
        :disabled="loading"
        type="submit"
        @click="forgetPasswordForm ? submit('FORGET_PASSWORD_REQUREST') : submit('LOGIN')"
      >
        <span v-show="forgetPasswordForm && !loading">
          {{ $t("Send verification Email") }}
        </span>
        <span v-show="!forgetPasswordForm && !loading">
          {{ $t("Login") }}
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
  login_validation,
} from "@/assets/js/constants";
export default {
  mixins: [store_action_mixin, check_errors_mixin],
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      showPassword: false,
      forgetPasswordForm: false,
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
    submit(service) {
      if (!this.CHECK_FORM_ERROR()) return;
      this.STORE_ACTION("MUTATION", "auth/AUTH", service, this.form).then(({ error }) => {
        if (error) return;

        if (service == "LOGIN") return this.$router.push("/app");
        this.$emit("success");
      });
    },
  },
  validations() {
    return login_validation(this.forgetPasswordForm);
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
