<template>
  <div>
    <section class="mb-5 d-flex justify-content-between align-items-center px-2">
      <h1 class="font-34">{{ $t("Bookings") }}</h1>

      <div class="d-flex align-items-center">
        <button
          v-b-modal.add-booking-modal
          class="btn btn-primary shadow-sm d-flex align-items-center pointer py-2 px-3"
        >
          <inline-svg
            fill="#fff"
            width="25px"
            height="20px"
            :src="require('@/static/images/s-Bookings.svg')"
          ></inline-svg>
          <p class="mx-1">{{ $t("Add Booking") }}</p>
        </button>
      </div>
    </section>

    <div>
      <!-- <section>
        <filter-users-sec />
      </section> -->
      <section>
        <bookings-table />
      </section>
    </div>

    <b-modal id="add-booking-modal" @show="get_doctors" hide-header hide-footer>
      <add-booking-form />
    </b-modal>
  </div>
</template>
<script>
import { store_action_mixin } from "@/assets/js/constants";
export default {
  mixins: [store_action_mixin],
  layout: "app-main",
  middleware: "appPages",
  methods: {
    get_doctors() {
      this.STORE_ACTION("QUERY", "user/MAIN", "USERS", {
        role: "doctor",
      });
    },
  },
  mounted() {
    this.STORE_ACTION("QUERY", "booking/MAIN", "BOOKINGS", {
      booking_date: "2021-10-03",
    });
  },
};
</script>
<style lang="scss">
#add-booking-modal {
  display: flex !important;
  .modal-dialog {
    margin: auto 0 0 auto !important;
  }
  .modal-body {
    padding: 0 !important;
  }
  .modal-content {
    border-radius: 10px 0 0 0 !important;
    border: 1px solid #f0f0f0 !important;
  }
}
</style>
