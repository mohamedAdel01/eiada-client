<template>
  <section class="d-flex flex-wrap mx-n2">
    <div class="col-md-3 px-2 py-2" v-for="(user, i) in users" :key="i">
      <div class="bg-white shadow-sm rounded pt-1 px-1 pb-4">
        <div class="d-flex justify-content-end align-items-center mb-4 pb-2">
          <button class="btn btn-link d-flex align-items-center">
            <inline-svg :src="require('@/static/images/edit.svg')"></inline-svg>
            <span class="mx-1 font-12 text-muted mt-1">{{ $t("Edit") }}</span>
          </button>
          <button class="btn btn-link d-flex align-items-center">
            <inline-svg :src="require('@/static/images/bin.svg')"></inline-svg>
            <span class="mx-1 font-12 text-danger mt-1">{{ $t("Remove") }}</span>
          </button>
        </div>

        <div class="d-flex justify-content-center text-center">
          <div>
            <img
              class="rounded-circle mb-4"
              style="width: 100px; height: 100px"
              src="@/static/images/avatar.jpg"
              alt="user-image"
            />

            <p class="font-18 text-dark font-lato mb-3">
              <span class="mx-1 text-info font-14" v-if="user.jop_title">{{ user.jop_title }}/</span>
              {{ user.fullname }}
            </p>
            <p class="font-14 text-info font-lato mb-4 pb-2">{{ user.email }}</p>

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
