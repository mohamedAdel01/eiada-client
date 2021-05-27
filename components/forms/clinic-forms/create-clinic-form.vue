<template>
  <b-form class="mt-5 pt-5" @submit.prevent>
    <b-form-group class="px-2" :data-label="$t('Clinic name')">
      <b-form-input
        v-model="$v.form.name.$model"
        class="py-4 border"
        :placeholder="$t('Enter', { input: $t('Clinic name') })"
        :state="$v.form.name.$dirty ? !$v.form.name.$error : null"
      ></b-form-input>
      <b-form-invalid-feedback v-show="!$v.form.name.required">{{
        $t("Please add your clinic name")
      }}</b-form-invalid-feedback>
    </b-form-group>

    <div class="px-2">
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
    </div>
  </b-form>
</template>

<script>
import { add_clinic_validation, store_action_mixin, check_errors_mixin } from "@/assets/js/constants";
export default {
  mixins: [store_action_mixin, check_errors_mixin],
  data() {
    return {
      form: {
        name: "",
      },
    };
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
  },
  methods: {
    submit() {
      if (!this.CHECK_FORM_ERROR()) return;
      this.STORE_ACTION("MUTATION", "clinic/CLINIC", "CREATE_CLINIC", this.form).then(
        ({ error, response }) => {
          if (error) {
            this.$toast.error(this.$t(response.errors[0].message));
            return;
          }
          this.$emit("success");
          setTimeout(() => {
            this.$router.push("/app/branch/create-branch");
          }, 5000);
        }
      ).catch(error => {
        this.$toast.error(this.$t(error));
      })
    },
  },
  validations: add_clinic_validation,
};
</script>
