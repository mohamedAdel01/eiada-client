<template>
  <div class="users-table">
    <table class="table table-head-custom table-vertical-center mb-4 shadow-sm">
      <thead>
        <tr class="d-md-table-row d-none">
          <th class="bg-white py-4 text-uppercase">{{ $t("Name") }}</th>
          <th class="bg-white text-uppercase py-4 font-12">
            {{ $t("User Info") }}
          </th>
          <th class="bg-white text-uppercase py-4 font-12">{{ $t("Tracking#") }}</th>
          <th class="bg-white text-uppercase py-4 font-12 text-center gap-right">
            {{ $t("Total Charge") }}
          </th>
        </tr>
      </thead>
      <tbody v-show="loading != 'INVOICES'">
        <tr v-for="(user, i) in users" :key="i">
          <td
            :data-label="$t('Date')"
            :class="[
              'py-md-4 py-1 overlay d-md-table-cell d-flex justify-content-center align-items-center',
              i % 2 == 1 ? 'bg-white' : 'bg-light',
            ]"
          >
            {{ user.fullname }}
          </td>
          <td
            :data-label="$t('Order#')"
            :class="[
              'py-md-4 py-1 overlay d-md-table-cell d-flex justify-content-center align-items-center',
              i % 2 == 1 ? 'bg-white' : 'bg-light',
            ]"
          >
            12684246524
          </td>
          <td
            :data-label="$t('Tracking#')"
            :class="[
              'py-md-4 py-1 overlay d-md-table-cell d-flex justify-content-center align-items-center',
              i % 2 == 1 ? 'bg-white' : 'bg-light',
            ]"
          >
            2584569854575
          </td>
          <td
            :class="[
              'py-md-4 py-1 overlay d-md-table-cell d-flex justify-content-center align-items-center text-center',
              i % 2 == 1 ? 'bg-white' : 'bg-light',
            ]"
          >
            hellooo
          </td>
        </tr>
        <!-- <tr v-show="!invoices.length">
          <td class="px-5" colspan="100%">
            <div
              class="mx-5 my-5 bg-light rounded-lg p-4 text-center font-20 text-black-50 font-weight-bold"
            >
              {{ $t("There is no result") }}
            </div>
          </td>
        </tr> -->
      </tbody>
    </table>
    <!-- <loader-sec class="my-5 py-5" v-show="loading && loading == 'INVOICES'" /> -->
    <!-- <pagination-sec
      v-show="!loading"
      action="invoice/INVOICE"
      service="INVOICES"
      :pagination="pagination"
      :filter="filter"
    /> -->
  </div>
</template>

<script>
export default {
  computed: {
    users() {
      return this.$store.state.user.users;
    },
    // pagination() {
    //   return this.$store.state.invoice.pagination;
    // },
    // filter() {
    //   return this.$store.state.invoice.filter;
    // },
    // loading() {
    //   return false;
    // },
  },
  //   methods: {
  //     getInvoiceDetails(invoice_id) {
  //       this.STORE_ACTION("invoice/INVOICE", "INVOICE_DETAILS", invoice_id);
  //       this.$bvModal.show("invoice-details-modal");
  //     },
  //   },
};
</script>

<style lang="scss">
@import "~assets/css/colors.scss";
.users-table {
  min-height: 500px;
  .dropdown-menu {
    min-width: 18rem;

    // .dropdown-item {
    //   &:hover {
    //     background: $light-dark !important;
    //   }
    //   &:active {
    //     background: $light-dark !important;
    //   }
    // }
  }
}
</style>
