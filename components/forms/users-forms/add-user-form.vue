<template>
  <b-form
    class="user-form d-flex flex-wrap align-items-start flex-column bg-white rounded h-100 overflow-hidden"
    @submit.prevent
  >
    <div class="w-100 mb-auto">
      <div class="d-flex justify--center align-items-center mb-5 mt-3">
        <div class="rounded shadow-sm mx-2 p-3">
          <inline-svg
            fill="#777"
            width="25px"
            height="25px"
            :src="require('@/static/images/add-user.svg')"
          ></inline-svg>
        </div>
        <h3 class="mx-2 text-muted">{{ $t("Add User") }}</h3>
      </div>

      <b-form-group
        :class="['px-2 z-1', form.branch_id ? 'show-label' : '']"
        :data-label="$t('Branch')"
      >
        <model-list-select
          class="border rounded"
          :list="branches"
          v-model="$v.form.branch_id.$model"
          option-value="id"
          option-text="address"
          :placeholder="$t('Enter', { input: $t('Branch') })"
        >
        </model-list-select>
        <b-form-invalid-feedback v-show="!$v.form.branch_id.required">{{
          $t("This field is required")
        }}</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        :class="['px-2', form.email ? 'show-label' : '']"
        :data-label="$t('Email')"
      >
        <b-form-input
          v-model="form.email"
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
      </b-form-group>

      <b-form-group
        :class="['px-2', form.jop_title ? 'show-label' : '']"
        :data-label="$t('Jop Title')"
      >
        <b-form-input
          v-model="form.jop_title"
          class="py-4 border rounded"
          :placeholder="$t('Enter', { input: $t('Jop Title') })"
          :state="$v.form.jop_title.$dirty ? !$v.form.jop_title.$error : null"
        ></b-form-input>
        <b-form-invalid-feedback v-show="!$v.form.jop_title.required">{{
          $t("This field is required")
        }}</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        :class="['px-2 z-1', form.role_name ? 'show-label' : '']"
        :data-label="$t('Role')"
      >
        <div>
          <model-list-select
            class="border rounded"
            :list="roles"
            v-model="form.role_name"
            option-value="name"
            option-text="name"
            :placeholder="$t('Enter', { input: $t('Role') })"
          >
          </model-list-select>
          <button class="btn btn-link text-primary p-0 mx-2">
            {{ $t("Edit Roles") }}
          </button>
          <b-form-invalid-feedback v-show="!$v.form.role_name.required">{{
            $t("This field is required")
          }}</b-form-invalid-feedback>
        </div>
      </b-form-group>

      <b-modal id="user-roles" hide-header hide-footer hide-backdrop>
        <p class="my-1">Third Modal</p>
      </b-modal>
    </div>
    <div class="w-100 px-2 mt-4 d-flex justify-content-between">
      <button class="btn btn-dark col-4 py-2 rounded" @click="submit">
        {{ $t("Submit") }}
      </button>
      <button v-b-modal.user-roles class="btn btn-link text-danger col-4 py-2 rounded">
        {{ $t("Cancel") }}
      </button>
    </div>
  </b-form>
</template>

<script>
import { add_user_validation } from "@/assets/js/constants";
import "vue-search-select/dist/VueSearchSelect.css";
import { ModelListSelect } from "vue-search-select";
export default {
  components: {
    ModelListSelect,
  },
  data() {
    return {
      form: {
        email: "mohamed7adel96@gmail.com",
        jop_title: "doctor",
        branch_id: "",
        role_name: "doctor",
        new_role: {
          name: "",
          custom: false,
          create: [],
          read: [],
          update: [],
          delete: [],
        },
      },
      responseErrors: null,
      options: [
        { value: "a", text: "This is First option" },
        { value: "b", text: "Selected Option" },
        { value: { C: "3PO" }, text: "This is an option with object value" },
        { value: "d", text: "This one is disabled", disabled: true },
      ],
    };
  },
  computed: {
    roles() {
      return this.$store.state.role.roles;
    },
    branches() {
      let authData = this.$cookiz.get("authData");
      return authData.branches;
    },
  },
  methods: {
    submit() {
      if (!this.checkFormErrors()) return;
      this.$store
        .dispatch("user/USER", {
          service: "CREATE_USER",
          payload: this.form,
        })
        .then(({ error, response }) => {
          this.loading = false;
          if (error) {
            this.responseErrors = response.errors[0];
            return;
          }
        });
      console.log(this.form);
    },
  },
  // mounted() {
  //   console.log(add_user_validation(this.form.role_name));
  // },
  validations() {
    return add_user_validation(this.form.role_name);
  },
};
</script>

<style lang="scss">
#user-roles {
  .modal-dialog {
    margin: 0 0 0 auto !important;
    height: 100% !important;
    padding-top: 100px !important;
    padding-left: 10px !important;
    padding-right: 10px !important;
  }
  &.modal.fade .modal-dialog {
    transform: translate(0, 100px) !important;
  }
  &.modal.show .modal-dialog {
    transform: none !important;
  }
  .modal-content {
    height: 100% !important;
    border-radius: 10px 10px 0 0 !important;
    box-shadow: 1px -1px 5px #ddd !important;
    border: none !important;
  }
}
</style>
