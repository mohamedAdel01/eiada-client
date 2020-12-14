<template>
  <div class="col-md-4 mx-auto mt-5">
    <no-ssr>
      <create-clinic-form />
    </no-ssr>
  </div>
</template>

<script>
export default {
  middleware: "appPages",
  layout: "app-1",
};
</script>

<style></style>
