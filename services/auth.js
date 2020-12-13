import gql from "graphql-tag";

export default {
  async REGISTER({ apollo }, payload) {
    return await apollo.mutate({
      mutation: gql`
              mutation {
                Register(
                  fullname: "${payload.fullname}",
                  email: "${payload.email}",
                  phone: "${payload.phone}",
                  password: "${payload.password}"
                ) {
                  user {
                    id
                    email
                    token
                    email_verified
                  }
                  errors {
                    key
                    message
                  }
                  message
                }
              }
            `
    });
  },

  async VERIFY_EMAIL({ apollo }, payload) {
    return await apollo.mutate({
      mutation: gql`
        mutation {
          Verify_Email(verification_code: "${payload}") {
            message
            errors {
              key
              message
            }
          }
        }
      `
    });
  },

  async RESEND_VERIFICATION_EMAIL({ apollo, token }) {
    return await apollo.mutate({
      mutation: gql`
        mutation {
          Resend_Verification_Email {
            message
            errors {
              key
              message
            }
          }
        }
      `,
      variables: {},
      context: {
        headers: {
          Authorization: token
        }
      }
    });
  },

  async LOGIN({ apollo }, payload) {
    return await apollo.mutate({
      mutation: gql`
        mutation {
          Login(email: "${payload.email}", password: "${payload.password}") {
            user {
              id
              fullname
              email
              token
              email_verified
            }
            errors {
              key
              message
            }
          }
        }
      `
    });
  }
};
