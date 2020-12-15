<template>
  <b-form class="mt-5 pt-5" @submit.prevent>
    <b-form-group
      v-for="(v, i) in $v.form.addresses.$each.$iter"
      :key="i"
      :data-label="$t('Branch address')"
    >
      <b-form-input
        v-model="v.address.$model"
        class="py-4 border rounded"
        :placeholder="$t('Enter', { input: $t('Branch address') })"
        :state="v.address.$dirty ? !v.address.$error : null"
      ></b-form-input>
      <b-form-invalid-feedback v-show="!v.address.required">{{
        $t("Please add your Branch address")
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
import { required, minLength } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        addresses: [
          {
            address: "",
          },
        ],
      },
      loading: false,
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
            this.$toast.error(this.$t(response.errors[0].message));
            return;
          }
          this.$emit("success");
          setTimeout(() => {
            this.$router.push("/app/branch/create-branch");
          }, 5000);
        });
    },
    checkErrors() {
      this.loading = true;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        this.loading = false;
        return false;
      }
      return true;
    },
  },
  validations: {
    form: {
      addresses: {
        minLength: minLength(1),
        $each: {
          address: {
            required,
          },
        },
      },
    },
  },
};
</script>
