<template>
  <div>
    <div class="mb-4 d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <div class="rounded bg-white shadow-sm pointer py-2 px-3">
          <inline-svg
            fill="#777"
            width="30px"
            height="30px"
            :src="require('@/static/images/users.svg')"
          ></inline-svg>
        </div>
        <h1 class="mx-2">Users</h1>
      </div>
      <div
        class="d-flex align-items-center tooltip-bottom"
        :data-label="$t('Add User')"
      >
        <button class="rounded btn btn-info shadow-sm pointer py-2 px-3 mx-2">
          <inline-svg
            fill="#fff"
            width="25px"
            height="20px"
            :src="require('@/static/images/add-user.svg')"
          ></inline-svg>
        </button>
      </div>
    </div>
    <div>
      
    </div>
  </div>
</template>
<script>
export default {
  layout: "app-2",
  middleware: "appPages",
};
</script>
