<template>
  <section class="bookings-table bg-white shadow-sm rounded overflow-auto">
    <table>
      <thead>
        <tr>
          <th class="bg-white border-right border-bottom text-center border-0"></th>
          <th
            class="bg-white border-right border-bottom text-center border-0"
            v-for="i in 11"
            :key="i"
          >
            <div>{{ i + ":00" }} PM</div>
          </th>
        </tr>
      </thead>
      <tbody v-if="bookings.length">
        <tr
          v-for="(day_booking, i) in bookings[0].day_bookings"
          :key="i"
          class="position-relative"
        >
          <td
            class="border-bottom bg-white border-light text-dark text-center z-3 font-16"
          >
            <span class="font-14 mx-1">{{ $t("Dr/") }}</span
            >{{ day_booking.doctor.name }}
          </td>
          <td
            class="border-right border-bottom border-light bg-white pointer hoverable"
            v-for="x in 11"
            :key="x"
          ></td>
          <div>
            <div
              v-for="(booking, i) in day_booking.doctor_bookings"
              :key="i"
              :style="{
                width: (booking.end_time - booking.start_time) * 300 + 'px',
                'min-height': '200px',
                top: '0',
                left: booking.start_time * 300 + 'px',
              }"
              class="p-2 position-absolute z-3"
            >
              <div class="px-3 py-2 bg-light-primary rounded-lg pointer">
                <p class="text-muted mb-1">2:00 PM : 3:00 PM</p>
                <p class="text-dark font-weight-bold">Mohamed Adel</p>
                <p class="text-dark font-weight-bold">01116515445</p>
              </div>
            </div>
          </div>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  computed: {
    bookings() {
      return this.$store.state.booking.bookings;
    },
  },
};
</script>

<style lang="scss">
@import "~assets/css/colors.scss";
.bookings-table {
  min-height: 450px;
  max-height: 500px;
  table {
    white-space: nowrap;
    border-collapse: separate;
    border-spacing: 0;
    table-layout: fixed;

    thead th {
      position: sticky;
      top: 0;
      z-index: 4;
      min-width: 300px;
      width: 300px;
      min-height: 70px;
      height: 70px;
    }

    thead th:first-child {
      left: 0;
      z-index: 5;
    }

    tbody td {
      min-width: 300px;
      width: 300px;
      min-height: 100px;
      height: 100px;
      z-index: 1;
      border-width: 4px !important;
      transition: 0.3s;
      &.hoverable:hover {
        background: $light !important;
      }
    }

    tbody td:first-child {
      position: sticky;
      left: 0;
      z-index: 4;
    }
  }
}
</style>
