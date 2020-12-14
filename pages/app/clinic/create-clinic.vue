<template>
  <div class="col-md-4 mx-auto mt-2">
    <no-ssr>
      <create-clinic-form v-if="!showSuccessMsg" @success="showSuccessMsg = true" />
      <message-sec
        v-if="showSuccessMsg"
        :status="true"
        title="Clinic has been created successfully"
        message="We will go to add your clinic branches in 5sec"
      />
    </no-ssr>
  </div>
</template>

<script>
export default {
  middleware: "appPages",
  layout: "app-1",
  data() {
    return {
      showSuccessMsg: false,
    };
  },
};
</script>

<style></style>
