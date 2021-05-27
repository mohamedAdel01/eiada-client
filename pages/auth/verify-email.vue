<template>
  <div class="d-flex justify-content-between p-4">
    <section class="col-md-5 col-12 h-100">
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
    </section>
    <section class="col-md-5 col-12">
      <div v-if="!response" class="text-center mt-5 pt-5 text-muted">
        <h4>{{ $t("Verifing your Email") }}</h4>
        <p class="h6 d-flex align-items-center justify-content-center">
          <span class="mx-2">
            {{ $t("...Loading") }}
          </span>
          <b-spinner small variant="info" label="Spinning"></b-spinner>
        </p>
      </div>
      <message-sec
        v-if="response"
        :status="response.status"
        :title="response.title"
        :message="response.message"
      />

      <div class="text-center" v-if="response && !response.status">
        <button class="btn btn-light" @click="resend_verification_email">
          {{ $t("Resend verification email") }}
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import {
  store_action_mixin
} from "@/assets/js/constants";
export default {
  mixins: [store_action_mixin],
  middleware: "verificationPages",
  layout: "auth",
  data() {
    return {
      response: null,
    };
  },
  methods: {
    resend_verification_email() {
      this.STORE_ACTION("MUTATION", "auth/AUTH", "RESEND_VERIFICATION_EMAIL").then(
        ({ error, response }) => {
          if (error) {
            this.response = {
              status: false,
              title: "Error while Sending",
              message: response.errors[0].message,
            };
            return;
          }
          this.response = {
            status: true,
            title: "The email has been sent successfully",
            message: "Please check your Email to verify email",
          };
        }
      );
    },
    verify_email() {
      this.STORE_ACTION("MUTATION", "auth/AUTH", "VERIFY_EMAIL", {
        verification_code: this.$route.query.verification_code,
      }).then(({ error, response }) => {
        if (error) {
          this.response = {
            status: false,
            title: "Error while verifing",
            message: response.errors[0].message,
          };
          return;
        }
        this.response = {
          status: true,
          title: "Your Email verified successfuly",
          message: "Enjoy using the app",
        };
        setTimeout(() => {
          this.$router.push("/");
        }, 5000);
      });
    },
  },
  mounted() {
    if (!this.$route.query.verification_code) return this.$router.push("/");
    this.verify_email();
  },
};
</script>
