<template>
  <b-form @submit.prevent>
    <b-form-group class="position-relative" :data-label="$t('Password')">
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
        v-show="$v.form.password.required && !$v.form.password.valid"
        >{{
          $t(
            "Password must contain capital letters, small letters, numbers and any special sign from these #?!@$%^&*-"
          )
        }}</b-form-invalid-feedback
      >
      <b-form-invalid-feedback
        class="d-block"
        v-if="responseErrors && responseErrors.key == 'password'"
        >{{ $t(responseErrors.message) }}</b-form-invalid-feedback
      >
    </b-form-group>

    <div class="position-relative">
      <button
        type="button"
        class="forget-password btn btn-link bg-white rounded pt-0 position-absolute"
        @click="change_password"
      >
        {{ $t("Change password") }}
      </button>
    </div>

    <button
      class="btn btn-dark btn-block py-2 mt-5"
      :disabled="loading"
      type="submit"
      @click="change_password"
    >
      <span v-show="!loading">
        {{ $t("Change password") }}
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
import { required, minLength } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        code: "",
        password: "",
      },
      showPassword: false,
      responseErrors: null,
      loading: false,
    };
  },
  methods: {
    change_password() {
      if (!this.checkErrors()) return;
      this.$store
        .dispatch("auth/AUTH", {
          service: "CHANGE_PASSWORD",
          payload: this.form,
        })
        .then(({ error, response }) => {
          this.loading = false;
          if (error) {
            this.responseErrors = response.errors[0];
            if (this.responseErrors.key == "code") this.$emit("error", this.responseErrors.message);
            return;
          }
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
  mounted() {
    if (!this.$route.query.code) return this.$router.push("/");
    this.form.code = this.$route.query.code;
  },
  validations: {
    form: {
      password: {
        required,
        // minLength: minLength(6),
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
.forget-password {
  right: 0;
  top: -10px;
}
</style>
