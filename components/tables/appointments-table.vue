<template>
  <section class="appointments-table bg-white shadow-sm rounded overflow-auto">
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
      <tbody>
        <tr v-for="(user, i) in users" :key="i" class="position-relative">
          <td
            class="border-bottom border-right border-light bg-primary text-white text-center z-3 font-20"
          >
            <span class="font-14 mx-1">{{$t('Dr/')}}</span>{{ user.fullname }}
          </td>
          <td
            class="border-right border-bottom border-light bg-white text-center pointer hoverable"
            v-for="x in 11"
            :key="x"
          ></td>
          <div>
            <div
              :style="{
                width: 250 + 'px',
                height: '100px',
                top: '0',
                left: 5 * 250 + 'px',
              }"
              class="p-2 position-absolute z-3"
            >
              <div class="px-3 py-2 h-75 bg-light-primary rounded-lg">
                <p class="text-muted mb-1">2:00 PM : 3:00 PM</p>
                <p class="text-dark font-weight-bold">patient: 01116515445</p>
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
    users() {
      return this.$store.state.user.users;
    },
  },
};
</script>

<style lang="scss">
@import "~assets/css/colors.scss";
.appointments-table {
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
      min-width: 250px;
      width: 250px;
      min-height: 70px;
      height: 70px;
    }

    thead th:first-child {
      left: 0;
      z-index: 5;
    }

    tbody td {
      min-width: 250px;
      width: 250px;
      min-height: 80px;
      height: 80px;
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
