<template>
  <b-form class="booking-form px-4 pt-4 pb-3" @submit.prevent>
    <div class="form-content w-100 mb-auto">
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

      <div>
        <b-form-group
          :class="['px-0 z-1 col-12', form.doctor_id ? 'show-label' : '']"
          :data-label="$t('Doctor')"
        >
          <model-list-select
            class="border rounded"
            :list="users"
            v-model="$v.form.doctor_id.$model"
            option-value="id"
            option-text="name"
            :placeholder="$t('Enter', { input: $t('Doctor') })"
          >
          </model-list-select>
          <div
            class="invalid-feedback d-block"
            v-if="$v.form.$anyError && !$v.form.branch_id.required"
          >
            {{ $t("This field is required") }}
          </div>
        </b-form-group>
      </div>

      <div>
        <date-picker
          class="border rounded col-12"
          :placeholder="$t('Please choose date')"
          id="datepicker"
          value-type="format"
          type="date"
          ref="date"
          v-model="form.booking_date"
          :disabled-date="(date) => date >= new Date()"
          format="YYYY-MM-DD"
        ></date-picker>
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
  </b-form>
</template>

<script>
import {
  form_validation,
  store_action_mixin,
  check_errors_mixin,
} from "@/assets/js/constants";
import "@/plugins/datepicker";
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
        doctor_id: null,
        booking_date: null,
        start_time: null,
        end_time: null,
        patient_phone: null,
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
    return form_validation(this.form);
  },
};
</script>

<style lang="scss">
.booking-form {
  .form-content {
    min-height: 350px;
  }

  .mx-datepicker {
    width: 100%;
    padding: 7px 5px;
  }
}
</style>
