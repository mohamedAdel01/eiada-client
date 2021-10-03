<template>
  <div class="px-2">
    <section class="mb-4 d-flex justify-content-between align-items-center">
      <h1 class="font-34">{{ $t("Users") }}</h1>

      <div class="d-flex align-items-center">
        <button
          v-b-modal.add-user-modal
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

    <b-modal id="add-user-modal" hide-header hide-footer>
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
    this.STORE_ACTION("QUERY", "role/MAIN", "ROLES");
    this.STORE_ACTION("QUERY", "user/MAIN", "USERS", {
      page: 1,
    });
  },
};
</script>
<style lang="scss">
#add-user-modal {
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
