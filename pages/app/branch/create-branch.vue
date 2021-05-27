<template>
  <div class="col-md-4 mx-auto mt-2">
      <create-branches-form v-if="!showSuccessMsg" @success="showSuccessMsg = true" />
      <message-sec
        v-if="showSuccessMsg"
        :status="true"
        title="Branches has been created successfully"
        message="Enjoy with your app"
      />
  </div>
</template>

<script>
export default {
  middleware: "appPages",
  layout: "app-intialization",
  data() {
    return {
      showSuccessMsg: false,
    };
  },
};
</script>
