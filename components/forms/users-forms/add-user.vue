<template>
  <b-form
    class="user-form p-3 bg-white rounded"
    @submit.prevent
  >
    <div class="d-flex justify-content-center mb-5">
      <div class="rounded-circle shadow-sm pointer p-4">
        <inline-svg
          fill="#aaa"
          width="50px"
          height="50px"
          :src="require('@/static/images/add-user.svg')"
        ></inline-svg>
      </div>
    </div>
    <div>
      <b-form-group :data-label="$t('Email')">
        <b-form-input
          v-model="$v.form.email.$model"
          class="py-4 border"
          :placeholder="$t('Enter', { input: $t('Email') })"
        ></b-form-input>
        <b-form-invalid-feedback v-show="!$v.form.email.required">{{
          $t("This field is required")
        }}</b-form-invalid-feedback>
        <b-form-invalid-feedback v-show="!$v.form.email.email">{{
          $t("Please add a valid email")
        }}</b-form-invalid-feedback>
      </b-form-group>
    </div>
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
      },
    };
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
    },
  },
};
</script>

<style>
</style>