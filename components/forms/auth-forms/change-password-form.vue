<template>
  <b-form @submit.prevent>
    <b-form-group class="position-relative px-2" :data-label="$t('New Password')">
      <div class="eye" v-show="form.new_password">
        <inline-svg
          v-show="!showPassword"
          @click="showPassword = true"
          fill="#aaa"
          :src="require('@/static/images/hide-password.svg')"
        />
        <inline-svg
          v-show="showPassword"
          @click="showPassword = false"
          fill="#aaa"
          :src="require('@/static/images/show-password.svg')"
        />
      </div>
      <b-form-input
        :type="showPassword ? 'text' : 'password'"
        v-model="$v.form.new_password.$model"
        class="py-4 border rounded"
        :placeholder="$t('Enter', { input: $t('New Password') })"
        :state="
          responseErrors && responseErrors.key == 'password'
            ? false
            : $v.form.new_password.$dirty
            ? !$v.form.new_password.$error
            : null
        "
      ></b-form-input>
      <b-form-invalid-feedback v-show="!$v.form.new_password.required">{{
        $t("This field is required")
      }}</b-form-invalid-feedback>
      <b-form-invalid-feedback
        v-show="$v.form.new_password.required && !$v.form.new_password.valid"
        >{{
          $t(
            "Password must contain capital letters, small letters, numbers and any special sign from these #?!@$%^&*-"
          )
        }}</b-form-invalid-feedback
      >
      <b-form-invalid-feedback
        class="d-block"
        v-if="responseErrors && responseErrors.key == 'new_password'"
        >{{ $t(responseErrors.message) }}</b-form-invalid-feedback
      >
    </b-form-group>

    <div class="px-2">
      <button
        class="btn btn-dark rounded btn-block py-2 mt-5"
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
    </div>
  </b-form>
</template>

<script>
import {
  store_action_mixin,
  check_errors_mixin,
  change_password_validation,
} from "@/assets/js/constants";
export default {
  mixins: [store_action_mixin, check_errors_mixin],
  data() {
    return {
      form: {
        verification_code: "",
        new_password: "",
      },
      showPassword: false,
      responseErrors: null,
      loading: false,
    };
  },
  methods: {
    change_password() {
      if (!this.CHECK_FORM_ERROR()) return;
      this.STORE_ACTION("MUTATION", "auth/AUTH", "CHANGE_PASSWORD", this.form).then(
        ({ error, response }) => {
          if (error) {
            this.responseErrors = response.errors[0];
            if (this.responseErrors.key == "code")
              this.$emit("error", this.responseErrors.message);
            return;
          }
          this.$emit("success");
        }
      );
    },
  },
  mounted() {
    if (!this.$route.query.verification_code) return this.$router.push("/");
    this.form.verification_code = this.$route.query.verification_code;
  },
  validations() {
    return change_password_validation();
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
