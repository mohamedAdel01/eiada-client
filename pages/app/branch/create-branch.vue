<template>
  <div class="col-md-4 mx-auto mt-2">
    <no-ssr>
      <create-branches-form v-if="!showSuccessMsg" @success="showSuccessMsg = true" />
      <message-sec
        v-if="showSuccessMsg"
        :status="true"
        title="Branches has been created successfully"
        message="Enjoy with your app"
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
