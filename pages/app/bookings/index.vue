<template>
  <div>
    <section class="mb-5 d-flex justify-content-between align-items-center px-2">
      <h1 class="mx-2 font-34">{{ $t("Bookings") }}</h1>

      <div class="d-flex align-items-center">
        <button
          v-b-modal.add-user
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

    <b-modal id="add-user" size="lg" hide-header hide-footer>
      <add-user-form />
    </b-modal>
  </div>
</template>
<script>
import { store_action_mixin } from "@/assets/js/constants";
export default {
  mixins: [store_action_mixin],
  layout: "app-main",
  middleware: "appPages",
  mounted() {
    this.STORE_ACTION("QUERY", "booking/MAIN", "BOOKINGS", {
      booking_date: '2021-10-03',
    });
  },
};
</script>
<style lang="scss">
#add-user {
  .modal-dialog {
    margin: 0 0 0 auto !important;
    min-height: 100vh !important;
  }
  &.modal.fade .modal-dialog {
    transform: translate(200px, 0) !important;
  }
  &.modal.show .modal-dialog {
    transform: none !important;
  }
  .modal-content {
    min-height: 100vh !important;
    border-radius: 0 !important;
    border: 1px solid #f0f0f0 !important;
  }
}
</style>
