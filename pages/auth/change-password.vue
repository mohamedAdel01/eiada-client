<template>
  <div class="d-flex justify-content-between align-items-center p-4">
    <section class="col-md-5 col-12 h-100">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda corporis
        accusantium sint iusto doloribus suscipit ipsam cumque dicta id ipsa soluta itaque
        fugiat nam magnam quo praesentium, accusamus vel hic?
        <br />
        <br />
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione tempora quia
        labore, commodi repellendus quisquam. Fuga, vel! Dolorum, doloremque aperiam
        incidunt dicta voluptate alias eaque accusamus neque in reprehenderit animi!
        <br />
        <br />
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione tempora quia
        labore, commodi repellendus quisquam. Fuga, vel! Dolorum, doloremque aperiam
        incidunt dicta voluptate alias eaque accusamus neque in reprehenderit animi!
        <br />
        <br />
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione tempora quia
        labore, commodi repellendus quisquam. Fuga, vel! Dolorum, doloremque aperiam
        incidunt dicta voluptate alias eaque accusamus neque in reprehenderit animi!
      </p>
    </section>
    <section class="col-md-5 col-12">
      <no-ssr>
        <change-password-form
          v-if="!response"
          @success="handleMsg($event, true)"
          @error="handleMsg($event, false)"
        />
        <message-sec
          v-if="response"
          :status="response.status"
          :title="response.title"
          :message="response.message"
        />
      </no-ssr>
    </section>
  </div>
</template>

<script>
export default {
  middleware: "authPages",
  layout: "auth",
  data() {
    return {
      response: null,
    };
  },
  methods: {
    handleMsg(message, status) {
      if (status) {
        this.response = {
          status,
          title: "Password has been changed successfully",
          message: "You will redirected to Login page in 5 sec",
        };
        setTimeout(() => {
          this.$router.push("/");
        }, 5000);
        return;
      }

      this.response = {
        status,
        title: "Error while changing password",
        message,
      };
    },
  },
};
</script>
