<template>
  <div>
    <section class="mb-5 d-flex justify-content-between align-items-center px-2">
      <div class="d-flex align-items-center">
        <div class="bg-white rounded shadow-sm pointer py-1 px-2">
          <inline-svg
            fill="#777"
            width="30px"
            height="30px"
            :src="require('@/static/images/s-Users.svg')"
          ></inline-svg>
        </div>
        <h1 class="mx-2">{{ $t("Users") }}</h1>
      </div>
      <div class="d-flex align-items-center">
        <button
          v-b-modal.add-user
          class="btn btn-primary shadow-sm d-flex align-items-center pointer py-2 px-3"
        >
          <inline-svg
            fill="#fff"
            width="25px"
            height="20px"
            :src="require('@/static/images/add-user.svg')"
          ></inline-svg>
          <p class="mx-1">{{ $t("Add User") }}</p>
        </button>
      </div>
    </section>

    <div>
      <!-- <section>
        <filter-users-sec />
      </section> -->
      <section>
        <user-card-section />
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
    this.STORE_ACTION("QUERY", "role/ROLE", "ROLES");
    this.STORE_ACTION("QUERY", "user/USER", "USERS", {
      page: 1,
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
