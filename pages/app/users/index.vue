<template>
  <div>
    <section class="mb-4 d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <div class="bg-white rounded shadow-sm pointer py-1 px-2">
          <inline-svg
            fill="#777"
            width="30px"
            height="30px"
            :src="require('@/static/images/users.svg')"
          ></inline-svg>
        </div>
        <h1 class="mx-2">{{ $t("Users") }}</h1>
      </div>
      <div class="d-flex align-items-center tooltip-bottom" :data-label="$t('Add User')">
        <button v-b-modal.add-user class="btn btn-info shadow-sm pointer py-2 px-3 mx-2">
          <inline-svg
            fill="#fff"
            width="25px"
            height="20px"
            :src="require('@/static/images/add-user.svg')"
          ></inline-svg>
        </button>
      </div>
    </section>
    <section>
      <b-modal id="add-user" hide-header hide-footer no-close-on-backdrop>
        <add-user />
      </b-modal>
    </section>
  </div>
</template>
<script>
export default {
  layout: "app-2",
  middleware: "appPages",
};
</script>
<style lang="scss">
#add-user {
  .modal-dialog {
    margin: 0 0 0 auto !important;
    height: 100% !important;
  }
  &.modal.fade .modal-dialog {
    transform: translate(200px, 0) !important;
  }
  &.modal.show .modal-dialog {
    transform: none !important;
  }
  .modal-content {
    height: 100% !important;
    border-radius: 0 !important;
    border: 1px solid #f0f0f0 !important;
  }
}
</style>
