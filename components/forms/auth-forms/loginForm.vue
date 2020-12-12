<template>
  <b-form @submit.prevent>
    <b-form-group :data-label="$t('Email')">
      <b-form-input
        v-model="$v.form.email.$model"
        class="py-4 border rounded"
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

    <b-form-group class="position-relative" :data-label="$t('Password')">
      <div class="eye" v-show="form.password">
        <inline-svg
          v-show="!showPassword"
          @click="showPassword = true"
          fill="#fff"
          :src="require('@/static/images/hide-password.svg')"
        ></inline-svg>
        <inline-svg
          v-show="showPassword"
          @click="showPassword = false"
          fill="#fff"
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

    <button class="btn btn-dark btn-block py-2" :disabled="loading" @click="login">
      <span v-show="!loading">
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
import { required, sameAs, email, minLength } from "vuelidate/lib/validators";
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
    };
  },
  methods: {
    login() {
      this.loading = true;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        this.$toast.info(this.$t("Please fill all inputs with correct data"));
        this.loading = false;
        return false;
      }
      this.$store
        .dispatch("auth/AUTH", {
          service: "LOGIN",
          payload: this.form,
        })
        .then(({ error, response }) => {
          this.loading = false;
          if (error) {
            this.responseErrors = response.errors[0];
            return;
          }
          this.$emit("success");
          setTimeout(() => {
            this.$router.push("/");
          }, 5000);
        });
    },
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
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
