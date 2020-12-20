<template>
  <b-form class="mt-5" @submit.prevent>
    <b-form-group
      class="px-2"
      v-for="(v, i) in $v.form.addresses.$each.$iter"
      :key="i"
      :data-label="$t('Branch address')"
    >
      <div class="position-relative">
        <div>
          <b-form-input
            v-model="v.address.$model"
            class="py-4 border"
            :placeholder="$t('Enter', { input: $t('Branch address') })"
            :state="v.address.$dirty ? !v.address.$error : null"
          ></b-form-input>
          <b-form-invalid-feedback v-show="!v.address.required">{{
            $t("Please add your Branch address")
          }}</b-form-invalid-feedback>
        </div>
        <div class="position-absolute branch-options">
          <inline-svg
            v-if="i == form.addresses.length - 1"
            @click="addBranch"
            width="30px"
            fill="#24b6de"
            :src="require('@/static/images/plus.svg')"
          ></inline-svg>
          <inline-svg
            v-if="i != form.addresses.length - 1"
            @click="removeBranch(i)"
            width="30px"
            fill="tomato"
            :src="require('@/static/images/minus.svg')"
          ></inline-svg>
        </div>
      </div>
    </b-form-group>

    <div class="px-2">
      <button
        class="btn btn-dark btn-block rounded py-2"
        :disabled="loading"
        type="submit"
        @click="submit"
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
        .dispatch("branch/BRANCH", {
          service: "CREATE_BRANCHES",
          payload: this.form,
        })
        .then(({ error, response }) => {
          if (error) {
            this.$toast.error(this.$t(response.errors[0].message));
            return;
          }
          this.$emit("success");
          setTimeout(() => {
            this.$router.push("/app");
          }, 5000);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    addBranch() {
      this.form.addresses.push({
        address: "",
      });
    },
    removeBranch(i) {
      this.form.addresses.splice(i, 1);
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

<style lang="scss">
.branch-options {
  top: 10px;
  right: -40px;
  cursor: pointer;
}
</style>
