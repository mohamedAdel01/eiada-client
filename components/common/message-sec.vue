<template>
  <section class="text-center p-3">
    <div class="msg-imgs">
      <img v-show="status" src="@/static/images/check-mark.svg" alt="success-img" />
      <img v-show="!status" src="@/static/images/exclamation-mark.svg" alt="error-img" />
    </div>
    <div
      :class="[
        'mt-4 bg-white border border-primary rounded-lg p-2',
        status ? 'border-primary' : 'border-danger',
      ]"
    >
      <h4 class="font-20" :class="status ? 'text-primary' : 'text-danger'">
        {{ $t(title) }}
      </h4>
      <p>{{ $t(message) }}</p>
    </div>
  </section>
</template>

<script>
export default {
  props: ["status", "title", "message"],
};
</script>

<style lang="scss">
.msg-imgs {
  img {
    width: 130px;
    height: 130px;
  }
}
</style>
