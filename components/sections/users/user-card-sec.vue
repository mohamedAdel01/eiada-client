<template>
  <section class="d-flex flex-wrap">
    <div class="col-md-3 px-2" v-for="(user, i) in users" :key="i">
      <div class="bg-white shadow-sm rounded pt-1 px-1 pb-4">
        <div class="d-flex justify-content-end align-items-center mb-5">
          <button class="btn btn-link d-flex align-items-center">
            <inline-svg :src="require('@/static/images/edit.svg')"></inline-svg>
            <span class="mx-1 font-12 text-secondary">{{ $t("Edit") }}</span>
          </button>
          <button class="btn btn-link d-flex align-items-center">
            <inline-svg :src="require('@/static/images/bin.svg')"></inline-svg>
            <span class="mx-1 font-12 text-danger">{{ $t("Delete") }}</span>
          </button>
        </div>

        <div class="d-flex justify-content-center text-center">
          <div>
            <img
              class="rounded-circle mb-4"
              style="width: 110px; height: 110px"
              src="@/static/images/avatar.jpg"
              alt="user-image"
            />

            <p class="font-18 text-dark font-lato mb-3">{{ user.fullname }}</p>
            <p class="font-14 text-info font-lato mb-5">{{ user.email }}</p>

            <div>
              <inline-svg :src="require('@/static/images/permissions.svg')"></inline-svg>
              <span class="mx-1 font-14">
                {{ $t("Permissions") }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
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

<style></style>
