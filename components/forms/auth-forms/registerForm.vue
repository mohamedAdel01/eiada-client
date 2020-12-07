<template>
  <b-form @submit.prevent>
    <b-form-group :data-label="$t('Fullname')">
      <b-form-input
        class="py-4 bg-light border rounded"
        placeholder="Enter Fullname"
      ></b-form-input>
    </b-form-group>
    <b-form-group :data-label="$t('Email')">
      <b-form-input
        class="py-4 bg-light border rounded"
        placeholder="Enter Email"
      ></b-form-input>
    </b-form-group>
    <b-form-group :data-label="$t('Phone')">
      <b-form-input
        class="py-4 bg-light border rounded"
        placeholder="Enter Phone"
      ></b-form-input>
    </b-form-group>
    <b-form-group :data-label="$t('Password')">
      <b-form-input
        class="py-4 bg-light border rounded"
        placeholder="Enter Password"
      ></b-form-input>
    </b-form-group>
    <b-form-group :data-label="$t('Confirm Password')">
      <b-form-input
        class="py-4 bg-light border rounded"
        placeholder="Enter Confirm Password"
      ></b-form-input>
    </b-form-group>

    <button class="btn btn-info btn-block py-2" @click="register">
      {{ $t("Submit") }}
    </button>
  </b-form>
</template>

<script>
import gql from "graphql-tag";
export default {
  methods: {
    register() {
      console.log(this.$apollo.mutate);
      this.$store.dispatch("auth/test", "mohamed adel");
    },
  },
};
</script>

<style></style>
