<template>
  <b-form
    class="user-form d-flex flex-wrap align-items-start flex-column bg-white rounded h-90-full"
    @submit.prevent
  >
    <div class="w-100 mb-auto">
      <div class="d-flex align-items-center mb-4 mt-2">
        <div class="rounded shadow-sm mx-2 p-3">
          <inline-svg
            fill="#777"
            width="20px"
            height="20px"
            :src="require('@/static/images/add-user.svg')"
          ></inline-svg>
        </div>
        <h3 class="mx-2 text-muted font-20">{{ $t("Add User") }}</h3>
      </div>

      <div class="d-flex flex-wrap align-items-start mb-2">
        <b-form-group
          :class="[
            'px-2  z-1',
            form.branch_id ? 'show-label' : '',
            form.role_name === 'custom' ? 'col-md-6 col-12' : 'col-12',
          ]"
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
          <div
            class="invalid-feedback d-block"
            v-if="$v.form.$anyError && !$v.form.branch_id.required"
          >
            {{ $t("This field is required") }}
          </div>
        </b-form-group>

        <b-form-group
          :class="[
            'px-2',
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
            'px-2 ',
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
            'px-2 z-1',
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
        <div class="d-flex align-items-start justify-content-between">
          <div class="col-md-6 col-12 px-2">
            <p class="mb-2">{{ $t("Is this role is specially for this user?") }}</p>
            <b-form-group
              v-if="form.new_role.custom"
            >
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
          <div class="px-2">
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
      </div>
    </div>

    <div class="w-100 px-2 mt-4 d-flex justify-content-between">
      <button class="btn btn-dark col-4 py-2 rounded" @click="submit">
        {{ $t("Submit") }}
      </button>
      <button class="btn btn-link text-danger col-4 py-2 rounded">
        {{ $t("Cancel") }}
      </button>
    </div>
  </b-form>
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
        email: null,
        jop_title: null,
        branch_id: "",
        role_name: "",
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
    };
  },
  computed: {
    roles() {
      return [...this.$store.state.role.roles, { name: "custom" }];
    },
    loading() {
      return this.$store.state.loading;
    },
    branches() {
      let authData = this.$cookiz.get("authData");
      return authData.branches;
    },
  },
  methods: {
    submit() {
      if (!this.CHECK_FORM_ERROR()) return;
      this.STORE_ACTION("MUTATION", "user/USER", "CREATE_USER", this.form).then(
        ({ error, response }) => {
          if (error) return (this.responseErrors = response.errors[0]);
          Object.assign(this.$data, this.$options.data.apply(this));
          this.$v.$reset();
          this.$bvModal.hide("add-user");
        }
      );
    },
  },
  validations() {
    return add_user_validation(this.form.role_name);
  },
};
</script>

<style lang="scss">
// #user-roles {
//   .modal-dialog {
//     margin: 0 0 0 auto !important;
//     min-height: 100vh !important;
//     padding-top: 100px !important;
//     padding-left: 10px !important;
//     padding-right: 10px !important;
//   }
//   &.modal.fade .modal-dialog {
//     transform: translate(0, 100px) !important;
//   }
//   &.modal.show .modal-dialog {
//     transform: none !important;
//   }
//   .modal-content {
//     min-height: 100vh !important;
//     border-radius: 10px 10px 0 0 !important;
//     box-shadow: 1px -1px 5px #ddd !important;
//     border: none !important;
//   }
// }
</style>
