<template>
  <b-form @submit.prevent>
    <b-form-group :data-label="$t('Clinic name')">
      <b-form-input
        v-model="$v.form.name.$model"
        class="py-4 border rounded"
        :placeholder="$t('Enter', { input: $t('Clinic name') })"
        :state="$v.form.name.$dirty ? !$v.form.name.$error : null"
      ></b-form-input>
      <b-form-invalid-feedback v-show="!$v.form.name.required">{{
        $t("This field is required")
      }}</b-form-invalid-feedback>
    </b-form-group>

    <button
      class="btn btn-dark btn-block py-2"
      :disabled="loading"
      type="submit"
      @click="submit"
    >
      <span v-show="!loading">
        {{ $t("Create") }}
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
import { required } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        name: "",
      },
      loading: false,
      responseErrors: null,
    };
  },
  methods: {
    submit() {
      if (!this.checkErrors()) return;
      this.$store
        .dispatch("clinic/CLINIC", {
          service: "CREATE_CLINIC",
          payload: this.form,
        })
        .then(({ error, response }) => {
          this.loading = false;
          if (error) {
            this.responseErrors = response.errors[0];
            return;
          }
          if (service == "LOGIN") return this.$router.push("/");
          this.$emit("success");
        });
    },
    checkErrors() {
      this.loading = true;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        this.$toast.info(this.$t("Please add your clinic name"));
        this.loading = false;
        return false;
      }
      return true;
    },
  },
  validations: {
    form: {
      name: {
        required,
      },
    },
  },
};
</script>
