<template>
<div></div>
  <!-- <b-form class="user-form px-4 pt-4 pb-3" @submit.prevent>
    <div class="w-100 mb-auto">
      <div class="d-flex justify-content-between align-items-center mb-4 mt-2">
        <h3 class="mx-2 text-muted font-20">{{ $t("Add Booking") }}</h3>
        <inline-svg
          class="pointer"
          fill="#777"
          width="15px"
          height="20px"
          :src="require(`@/static/images/horizontal-arrow.svg`)"
        ></inline-svg>
      </div>

      <div class="d-flex flex-wrap align-items-start mb-2">
        <b-form-group
          :class="[
            'px-0  z-1',
            form.branch_id ? 'show-label' : '',
            form.role_name === 'custom' ? 'col-md-6 col-12' : 'col-12',
          ]"
          :data-label="$t('Doctor')"
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
          <div
            class="invalid-feedback d-block"
            v-if="$v.form.$anyError && !$v.form.branch_id.required"
          >
            {{ $t("This field is required") }}
          </div>
        </b-form-group>

        <b-form-group
          :class="[
            'px-0',
            form.role_name === 'custom' ? 'col-md-6 col-12' : 'col-12',
            form.email ? 'show-label' : '',
          ]"
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
          :class="[
            'px-0 ',
            form.role_name === 'custom' ? 'col-md-6 col-12' : 'col-12',
            form.jop_title ? 'show-label' : '',
          ]"
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
          :class="[
            'px-0 z-1',
            form.role_name === 'custom' ? 'col-md-6 col-12' : 'col-12',
            form.role_name ? 'show-label' : '',
          ]"
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
            <div
              class="invalid-feedback d-block"
              v-if="$v.form.$anyError && !$v.form.role_name.required"
            >
              {{ $t("This field is required") }}
            </div>
          </div>
        </b-form-group>
      </div>

      <div v-if="form.role_name === 'custom'">
        <div class="d-flex align-items-start justify-content-between mb-3">
          <div class="col-md-6 col-12 px-0">
            <p class="mb-2">{{ $t("Is this role is specially for this user?") }}</p>
            <b-form-group v-if="!form.new_role.custom">
              <b-form-input
                v-model="form.new_role.name"
                class="py-4 border rounded"
                :placeholder="$t('Enter', { input: $t('New Role Name') })"
                :state="
                  $v.form.new_role.name.$dirty ? !$v.form.new_role.name.$error : null
                "
              ></b-form-input>
              <b-form-invalid-feedback v-show="!$v.form.new_role.name.required">{{
                $t("This field is required")
              }}</b-form-invalid-feedback>
            </b-form-group>
          </div>
          <div class="px-0">
            <switch-button
              class="d-flex"
              key1="Yes"
              key2="No"
              :value1="true"
              :value2="false"
              @change="form.new_role.custom = $event"
              :choosedItem="form.new_role.custom"
            />
          </div>
        </div>

        <div class="bg-light rounded p-2 d-flex flex-wrap">
          <div class="p-1 mb-3 col-md-4 col-6">
            <h4 class="font-16 font-weight-bold">{{ $t("User Roles") }}</h4>
            <div class="m-1">
              <b-form-checkbox
                class="font-12 mb-1"
                v-b-tooltip.hover
                title="Tooltip content"
                >{{ $t("View User Info") }}</b-form-checkbox
              >
              <b-form-checkbox
                class="font-12 mb-1"
                v-b-tooltip.hover
                title="Tooltip content"
                >{{ $t("Create User") }}</b-form-checkbox
              >
              <b-form-checkbox
                class="font-12 mb-1"
                v-b-tooltip.hover
                title="Tooltip content"
                >{{ $t("Update User Info") }}</b-form-checkbox
              >
              <b-form-checkbox
                class="font-12 mb-1"
                v-b-tooltip.hover
                title="Tooltip content"
                >{{ $t("Arrchive User Account") }}</b-form-checkbox
              >
            </div>
          </div>
          <div class="p-1 mb-3 col-md-4 col-6">
            <h4 class="font-16 font-weight-bold">{{ $t("User Roles") }}</h4>
            <div class="m-1">
              <b-form-checkbox
                class="font-12 mb-1"
                v-b-tooltip.hover
                title="Tooltip content"
                >{{ $t("View User Info") }}</b-form-checkbox
              >
              <b-form-checkbox
                class="font-12 mb-1"
                v-b-tooltip.hover
                title="Tooltip content"
                >{{ $t("Create User") }}</b-form-checkbox
              >
              <b-form-checkbox
                class="font-12 mb-1"
                v-b-tooltip.hover
                title="Tooltip content"
                >{{ $t("Update User Info") }}</b-form-checkbox
              >
              <b-form-checkbox
                class="font-12 mb-1"
                v-b-tooltip.hover
                title="Tooltip content"
                >{{ $t("Arrchive User Account") }}</b-form-checkbox
              >
            </div>
          </div>
          <div class="p-1 mb-3 col-md-4 col-6">
            <h4 class="font-16 font-weight-bold">{{ $t("User Roles") }}</h4>
            <div class="m-1">
              <b-form-checkbox
                class="font-12 mb-1"
                v-b-tooltip.hover
                title="Tooltip content"
                >{{ $t("View User Info") }}</b-form-checkbox
              >
              <b-form-checkbox
                class="font-12 mb-1"
                v-b-tooltip.hover
                title="Tooltip content"
                >{{ $t("Create User") }}</b-form-checkbox
              >
              <b-form-checkbox
                class="font-12 mb-1"
                v-b-tooltip.hover
                title="Tooltip content"
                >{{ $t("Update User Info") }}</b-form-checkbox
              >
              <b-form-checkbox
                class="font-12 mb-1"
                v-b-tooltip.hover
                title="Tooltip content"
                >{{ $t("Arrchive User Account") }}</b-form-checkbox
              >
            </div>
          </div>
          <div class="p-1 mb-3 col-md-4 col-6">
            <h4 class="font-16 font-weight-bold">{{ $t("User Roles") }}</h4>
            <div class="m-1">
              <b-form-checkbox
                class="font-12 mb-1"
                v-b-tooltip.hover
                title="Tooltip content"
                >{{ $t("View User Info") }}</b-form-checkbox
              >
              <b-form-checkbox
                class="font-12 mb-1"
                v-b-tooltip.hover
                title="Tooltip content"
                >{{ $t("Create User") }}</b-form-checkbox
              >
              <b-form-checkbox
                class="font-12 mb-1"
                v-b-tooltip.hover
                title="Tooltip content"
                >{{ $t("Update User Info") }}</b-form-checkbox
              >
              <b-form-checkbox
                class="font-12 mb-1"
                v-b-tooltip.hover
                title="Tooltip content"
                >{{ $t("Arrchive User Account") }}</b-form-checkbox
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-5 d-flex justify-content-end">
      <button
        class="btn btn-link text-black-50 px-4 py-2 mx-4 rounded"
        @click="$bvModal.hide('add-user-modal')"
      >
        {{ $t("Cancel") }}
      </button>
      <button class="btn btn-primary px-4 py-2 rounded" @click="submit">
        {{ $t("Submit") }}
      </button>
    </div>
  </b-form> -->
</template>

<script>
import {
  add_user_validation,
  store_action_mixin,
  check_errors_mixin,
} from "@/assets/js/constants";
import "vue-search-select/dist/VueSearchSelect.css";
import { ModelListSelect } from "vue-search-select";
export default {
  mixins: [store_action_mixin, check_errors_mixin],
  components: {
    ModelListSelect,
  },
  data() {
    return {
      form: {
        booking_date: null,
        patient_phone: null,
        start_time: null,
        end_time: null,
        doctor_id: null,
      },
      responseErrors: null,
    };
  },
  computed: {
    users() {
      return this.$store.state.user.users;
    },
    loading() {
      return this.$store.state.loading;
    },
  },
  methods: {
    submit() {
      if (!this.CHECK_FORM_ERROR()) return;
      this.STORE_ACTION("MUTATION", "user/MAIN", "CREATE_USER", this.form).then(
        ({ error, response }) => {
          if (error) return (this.responseErrors = response.errors[0]);
          Object.assign(this.$data, this.$options.data.apply(this));
          this.$v.$reset();
          this.$bvModal.hide("add-user-modal");
        }
      );
    },
  },
  validations() {
    return add_user_validation(this.form.role_name);
  },
};
</script>
