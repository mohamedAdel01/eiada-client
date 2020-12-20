<template>
  <b-form @submit.prevent>
    <b-form-group :data-label="$t('Email')">
      <b-form-input
        v-model="$v.form.email.$model"
        class="py-4 border"
        :placeholder="$t('Enter', { input: $t('Email') })"
        :state="
          responseErrors && responseErrors.key == 'email'
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
        v-if="responseErrors && responseErrors.key == 'email'"
        >{{ $t(responseErrors.message) }}</b-form-invalid-feedback
      >
    </b-form-group>

    <b-form-group
      class="position-relative"
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
        class="py-4 border"
        :placeholder="$t('Enter', { input: $t('Password') })"
        :state="
          responseErrors && responseErrors.key == 'password'
            ? false
            : $v.form.password.$dirty
            ? !$v.form.password.$error
            : null
        "
      ></b-form-input>
      <b-form-invalid-feedback v-show="!$v.form.password.required">{{
        $t("This field is required")
      }}</b-form-invalid-feedback>
      <b-form-invalid-feedback
        class="d-block"
        v-if="responseErrors && responseErrors.key == 'password'"
        >{{ $t(responseErrors.message) }}</b-form-invalid-feedback
      >
    </b-form-group>

    <div class="position-relative">
      <button
        type="button"
        class="forget-password btn btn-link bg-white pt-0 position-absolute"
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

    <button
      class="btn btn-dark btn-block py-2 mt-5"
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
  </b-form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      showPassword: false,
      responseErrors: null,
      loading: false,
      forgetPasswordForm: false,
    };
  },
  methods: {
    submit(service) {
      if (!this.checkErrors()) return;
      this.$store
        .dispatch("auth/AUTH", {
          service,
          payload: this.form,
        })
        .then(({ error, response }) => {
          this.loading = false;
          if (error) {
            this.responseErrors = response.errors[0];
            return;
          }
          if (service == "LOGIN") return this.$router.push("/app");
          this.$emit("success");
        });
    },
    checkErrors() {
      this.loading = true;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        this.$toast.info(this.$t("Please fill all inputs with correct data"));
        this.loading = false;
        return false;
      }
      return true;
    },
  },
  validations() {
    if (this.forgetPasswordForm) {
      return {
        form: {
          email: {
            required,
            email,
          },
        },
      };
    }
    return {
      form: {
        email: {
          required,
          email,
        },
        password: {
          required,
        },
      },
    };
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
.forget-password {
  right: 0;
  top: -10px;
}
</style>
